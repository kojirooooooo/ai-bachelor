import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MypageRoutingModule } from './mypage-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
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
    ChatRoomListsComponent,
  ],
  imports: [CommonModule, MypageRoutingModule, FormsModule, ImageCropperModule],
})
export class MypageModule {}
