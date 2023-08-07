import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { lastValueFrom } from 'rxjs';
import { authError } from '../auth/auth.error';
import { User } from '../shared/interface/users';
import { LoadingService } from './loading/loading.service';
import { UsersFirestoreService } from './users/users-firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userProfile: User = {
    displayName: '',
    email: '',
    photoName: '',
    photoPath: '',
    introduction: '',
    userStatus: '',
    createdAt: new Date(),
  };

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar,
    private fns: AngularFireFunctions,
    private usersFirestore: UsersFirestoreService,
    private loadingService: LoadingService
  ) {}

  authSignUp(
    userDoc: {
      userId: string;
      email: string;
      displayName: string;
      userStatus: string;
    },
    password: string
  ) {
    this.loadingService.show().then(() => {
      this.afAuth
        .createUserWithEmailAndPassword(userDoc.email, password)
        .then(async () => {
          await this.usersFirestore.getUserId().then((uid) => {
            if (uid) {
              this.router.navigate(['/']);
              this.snackBar.open('会員登録を行いました。', '', {
                duration: 3500,
              });
              userDoc.userId = uid;
              const callable = this.fns.httpsCallable('createUser');
              lastValueFrom(callable(userDoc));
            }
            this.loadingService.hide();
          });
        });
    });
  }

  async authSignin(login: { email: string; password: string }) {
    try {
      this.loadingService.show().then(async () => {
        await this.afAuth
          .signInWithEmailAndPassword(login.email, login.password)
          .then(() => {
            this.loadingService.show().then(() => {
              this.router.navigate(['/']);
              this.snackBar.open('ログインしました', '', {
                duration: 2500,
              });
              this.loadingService.hide();
              return;
            });
          });
      });
    } catch (error) {
      this.alertError(error);
      throw error;
    }
  }

  async authSignOut() {
    try {
      await this.afAuth.signOut();
      this.loadingService.show().then(() => {
        this.router.navigate(['/']);
        this.snackBar.open('ログアウトしました', '', {
          duration: 2500,
        });
        this.loadingService.hide();
        return;
      });
    } catch (error) {
      this.alertError(error);
      throw error;
    }
  }

  async resetEmail(email: string): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        await user.updateEmail(email);
        return true;
      } catch (error) {
        this.alertError(error);
        return false;
      }
    } else {
      return false;
    }
  }

  async resetPassword(email: string) {
    this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      })
      .catch(async (error) => {
        this.alertError(error);
        return false;
      });
  }

  /************ エラー処理関係 ************/

  async alertError(e: any) {
    if (authError.hasOwnProperty(e.code)) {
      e = authError[e.code];
    }
    alert(e.message);
  }
}
