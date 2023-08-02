import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

// const redirectUnauthorized = () => redirectUnauthorizedTo(['auth/sign-in']);
// const redirectLoggedIn = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectLoggedIn },
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'mypage',
    loadChildren: () =>
      import('./mypage/mypage.module').then((m) => m.MypageModule),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorized },
  },
  {
    path: 'chat-game',
    loadChildren: () =>
      import('./chat-game/chat-game.module').then((m) => m.ChatGameModule),
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorized },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
