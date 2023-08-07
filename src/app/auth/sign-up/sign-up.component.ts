import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { UsersFirestoreService } from 'src/app/shared/users/users-firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  loading: boolean = false;
  invitationId: string = '';

  password: string = '';

  userDoc: {
    userId: string;
    email: string;
    displayName: string;
    userStatus: string;
  } = {
    userId: '',
    email: '',
    displayName: '',
    userStatus: 'general',
  };

  term: boolean = false;

  constructor(
    private auth: AuthService,
    private usersFirestore: UsersFirestoreService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  signUp() {
    if (this.term) {
      this.auth.authSignUp(this.userDoc, this.password);
    } else {
      this.snackBar.open('利用規約に同意してください', '', {
        duration: 3000,
      });
      this.loading = false;
      return;
    }
  }
}
