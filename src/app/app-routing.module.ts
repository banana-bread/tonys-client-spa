import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ClientBookingsComponent } from './client-bookings/client-bookings.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginPageGuard } from './services/login-page-guard.service';

const routes: Routes = [
  { path: 'bookings', component: ClientBookingsComponent },
  // TODO: change this to login page component, which holds logincomponent
  { path: 'login', component: LoginComponent, canActivate: [LoginPageGuard] },
  { path: 'password/reset', component: ResetPasswordComponent, },

  { path: 'c/:companyId', redirectTo: 'c/:companyId/bookings', pathMatch: 'full' }, // LEGACY
  { path: 'c/:companyId/bookings', component: BookingComponent },                   // LEGACY
  { path: ':companySlug', component: BookingComponent },


  // { path: 'register', component: RegisterComponent },

  // { path: '404', component: NotFoundComponent },
  // { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
