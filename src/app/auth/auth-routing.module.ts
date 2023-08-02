import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  {
    path: 'sign-in',
    pathMatch: 'full',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    pathMatch: 'full',
    component: SignUpComponent,
  },
  {
    path: 'password-reset',
    pathMatch: 'full',
    component: PasswordResetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
