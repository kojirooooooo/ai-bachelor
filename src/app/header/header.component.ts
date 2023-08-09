import { Component, OnInit } from '@angular/core';
import { UsersFirestoreService } from '../shared/users/users-firestore.service';
import { LoadingService } from '../shared/loading/loading.service';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/interface/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user$: Observable<User | null | undefined> = this.usersfirestore.user$;

  constructor(
    private usersfirestore: UsersFirestoreService,
    private auth: AuthService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const loadingVisible: boolean = this.loadingService.visible;
    //console.log(loadingVisible);
  }

  logOut() {
    this.auth.authSignOut();
  }
}
