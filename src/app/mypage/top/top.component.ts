import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersFirestoreService } from 'src/app/shared/users/users-firestore.service';
import { User } from '../../shared/interface/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  user$: Observable<User | null | undefined> = this.usersfirestore.user$;

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
    private usersfirestore: UsersFirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$.subscribe((userInfo?) => {
      if (userInfo) {
        this.user = userInfo;
      }
    });
  }
}
