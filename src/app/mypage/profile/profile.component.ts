import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersFirestoreService } from 'src/app/shared/users/users-firestore.service';
import { ImagesFirestorageService } from '../../shared/images-firestorage.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { User } from '../../shared/interface/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  uid: string | null = null;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  user: User = {
    displayName: '',
    email: '',
    photoName: '',
    photoPath: '',
    introduction: '',
    userStatus: '',
    createdAt: new Date(),
  };

  constructor(
    private usersFirestore: UsersFirestoreService,
    private imagesFirestorage: ImagesFirestorageService,
    private loadingService: LoadingService,
    private router: Router,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    this.uid = await this.usersFirestore.getUserId();
    if (this.uid !== null) {
      const userInit = await this.usersFirestore.userInit(this.uid);
      if (userInit) {
        this.user = userInit;
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    // if (event.objectUrl) {
    //   this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
    //     event.objectUrl
    //   );
    // }
    console.log(event.base64);

    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  updateProfile() {
    this.loading = true;
    this.loadingService.show().then(() => {
      if (this.uid != null) {
        if (this.croppedImage) {
          this._updatePhoto().then(() => {
            this.loading = false;
            this.snackBar.open('プロフィールを修正しました', '', {
              duration: 3000,
            });
            this.router.navigate(['/mypage']);
            this.loadingService.hide();
          });
        } else {
          this.usersFirestore.userSet(this.user, this.uid).then(() => {
            this.loading = false;
            this.snackBar.open('プロフィールを修正しました', '', {
              duration: 3000,
            });
            this.router.navigate(['/mypage']);
            this.loadingService.hide();
          });
        }
      }
    });
  }

  private async _updatePhoto() {
    const now = new Date();
    const newPhotoName =
      'profileImage_' +
      now.getHours() +
      now.getMinutes() +
      now.getSeconds() +
      now.getMilliseconds() +
      '.png';
    const filePath = 'profileImage';
    if (this.croppedImage !== null) {
      if (this.user.photoName !== '') {
        const oldPhotoName = this.user.photoName;
        this.imagesFirestorage.deletePhoto(oldPhotoName, filePath);
      }
      this.user.photoName = newPhotoName;
      this.imagesFirestorage
        .uploadOnePhoto(this.croppedImage, this.user.photoName, filePath)
        .then((ref) => {
          this.user.photoPath = ref;
          if (this.uid != null) {
            this.usersFirestore.userSet(this.user, this.uid);
          }
        });
    }
  }
}
