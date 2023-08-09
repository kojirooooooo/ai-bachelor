import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  loading: boolean = false;
  email: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async resetPassWordSend() {
    this.loading = true;
    if (this.email) {
      this.authService
        .resetPassword(this.email)
        .then(async () => {
          this.snackBar.open(
            '登録したメールアドレス宛に確認メールを送信しました。ご確認いただき、メール本文のリンクからパスワードを再設定してください。',
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
        })
        .catch(async () => {
          this.snackBar.open('パスワード変更に失敗しました', '', {
            duration: 3000,
          });
          this.loading = false;
        });
    }
  }
}
