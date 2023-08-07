import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ImagesFirestorageService } from 'src/app/shared/images-firestorage.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, switchMap } from 'rxjs/operators';
import { Observable, of, lastValueFrom } from 'rxjs';
import { User } from '../interface/users';
import { authError } from 'src/app/auth/auth.error';

@Injectable({
  providedIn: 'root',
})
export class UsersFirestoreService {
  user$: Observable<User | null | undefined> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        return this.af.doc<User>('user/' + afUser.uid).valueChanges();
      } else {
        return of(null);
      }
    })
  );

  private userDoc?: AngularFirestoreDocument<User>;

  constructor(
    private af: AngularFirestore,
    private afAuth: AngularFireAuth,
    private imagesFirestorage: ImagesFirestorageService,
    private fns: AngularFireFunctions
  ) {}

  async getUserId() {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  }

  async getUserCurrentEmail() {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user.email;
    } else {
      return null;
    }
  }

  updateProfileOnSignUp(
    id: string,
    userInfo: { displayName: string; userStatus: string }
  ) {
    this.userDoc = this.af.doc<User>('user/' + id);
    return this.userDoc.update({
      displayName: userInfo.displayName,
      userStatus: userInfo.userStatus,
    });
  }

  userInit(id: string) {
    this.userDoc = this.af.doc<User>('user/' + id);
    return lastValueFrom(this.userDoc.valueChanges().pipe(first()));
  }

  userSet(user: User, uid: string) {
    this.userDoc = this.af.doc<User>('user/' + uid);
    return this.userDoc.set(user);
  }

  async updateEmail(uid: string, email: string): Promise<boolean> {
    this.userDoc = this.af.doc<User>('user/' + uid);
    return this.userDoc
      .update({
        email: email,
      })
      .then(() => {
        return true;
      })
      .catch(async (error) => {
        this.alertError(error);
        return false;
      });
  }

  async userDelete(uid: string, photoName: string = ''): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user
        .delete()
        .then(() => {
          this._deleteUser(user.uid, photoName);
          return true;
        })
        .catch(async (error) => {
          this.alertError(error);
          return false;
        });
    } else {
      return false;
    }
  }

  //ユーザー削除のクラウドファンクション呼び出し
  private async _deleteUser(userId: string, photoName: string = '') {
    const callable = this.fns.httpsCallable('deleteUserById');
    lastValueFrom(callable({ userId: userId })).then(async () => {
      if (photoName !== '') {
        this.imagesFirestorage.deletePhoto(photoName, 'profileImage');
      }
    });
  }

  async alertError(e: any) {
    if (authError.hasOwnProperty(e.code)) {
      e = authError[e.code];
    }
    alert(e.message);
  }
}
