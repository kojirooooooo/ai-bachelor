import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypageRoutingModule } from './mypage-routing.module';
import { TopComponent } from './top/top.component';
import { EmailModifiedComponent } from './email-modified/email-modified.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { ChatRoomListsComponent } from './chat-room-lists/chat-room-lists.component';


@NgModule({
  declarations: [
    TopComponent,
    EmailModifiedComponent,
    PasswordResetComponent,
    ProfileComponent,
    WithdrawalComponent,
    ChatRoomListsComponent
  ],
  imports: [
    CommonModule,
    MypageRoutingModule
  ]
})
export class MypageModule { }
