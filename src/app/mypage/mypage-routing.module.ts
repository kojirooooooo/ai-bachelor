import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailModifiedComponent } from './email-modified/email-modified.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { TopComponent } from './top/top.component';
import { ChatRoomListsComponent } from './chat-room-lists/chat-room-lists.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TopComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'chat-room-lists',
    component: ChatRoomListsComponent,
  },
  {
    path: 'email-modified',
    component: EmailModifiedComponent,
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
  },
  {
    path: 'withdrawal',
    component: WithdrawalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypageRoutingModule {}
