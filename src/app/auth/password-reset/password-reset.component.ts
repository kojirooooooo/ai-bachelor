import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  loading: boolean = false;
  email: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  async resetPassWordSend() {
    this.loading = true;
    if (this.email) {
      this.authService
        .resetPassword(this.email)
        .then(() => {
          this.snackBar.open(
            '登録したメールアドレス宛に確認メールを送信しました。ご確認いただき、メール本文のリンクからパスワードを再設定してください。',
            '',
            {
              duration: 3000,
            }
          );
        })
        .catch(() => {
          this.snackBar.open('パスワード変更に失敗しました', '', {
            duration: 3000,
          });
        })
        .finally(() => {
          this.loading = false;
          this.router.navigate(['/']);
        });
    }
  }
}
