import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersFirestoreService } from 'src/app/shared/users/users-firestore.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-email-modified',
  templateUrl: './email-modified.component.html',
  styleUrls: ['./email-modified.component.scss'],
})
export class EmailModifiedComponent implements OnInit {
  loading: boolean = false;
  uid: string | null = '';
  currentEmail: string | null = '';
  email: string = '';

  constructor(
    private usersFirestore: UsersFirestoreService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    this.uid = await this.usersFirestore.getUserId();
    this.currentEmail = await this.usersFirestore.getUserCurrentEmail();
  }

  async changeEmail() {
    this.loading = true;
    this.loadingService.show().then(() => {
      this.authService.resetEmail(this.email).then((resetResult) => {
        if (resetResult) {
          if (this.uid !== null) {
            this.usersFirestore
              .updateEmail(this.uid, this.email)
              .then(async (updateResult) => {
                if (updateResult) {
                  this.snackBar.open(
                    'メールアドレスを修正しました。一度ログアウトします。',
                    '',
                    {
                      duration: 3000,
                    }
                  );
                  const sleep = (msec: any) =>
                    new Promise((resolve) => setTimeout(resolve, msec));
                  await sleep(3000).then(() => {
                    this.loading = false;
                    this.authService.authSignOut();
                  });
                } else {
                  this.loading = false;
                  return;
                }
              });
          }
        } else {
          this.loading = false;
          return;
        }
      });
      this.loadingService.hide();
    });
  }
}
