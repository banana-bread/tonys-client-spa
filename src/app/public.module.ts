import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module'

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password-dialog/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
// import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    // RecaptchaModule,
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ]
})
export class PublicModule { }
