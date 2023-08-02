import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatGameRoutingModule } from './chat-game-routing.module';
import { ListComponent } from './list/list.component';
import { WaitingComponent } from './waiting/waiting.component';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    ListComponent,
    WaitingComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    ChatGameRoutingModule
  ]
})
export class ChatGameModule { }
