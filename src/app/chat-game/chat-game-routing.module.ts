import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { WaitingComponent } from './waiting/waiting.component';

const routes: Routes = [
  {
    path: 'list/:pageNumber',
    component: ListComponent,
  },
  {
    path: 'detail/:roomId',
    component: DetailComponent,
  },
  {
    path: 'waiting/:roomId',
    component: WaitingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatGameRoutingModule {}
