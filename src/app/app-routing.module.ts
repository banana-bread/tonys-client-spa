import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './views/booking-stepper/booking.component';
import { ClientBookingsComponent } from './views/client-bookings/client-bookings.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { LoginPageGuard } from './services/login-page-guard.service';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'bookings', component: ClientBookingsComponent, canActivate: [AuthGuardService]  },
  // TODO: change this to login page component, which holds logincomponent
  { path: 'login', component: LoginPageComponent, canActivate: [LoginPageGuard] },
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
