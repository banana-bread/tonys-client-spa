import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppStateService } from './app-state.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginPageGuard implements CanActivate {

  constructor(
      private auth: AuthService, 
      private router: Router,
      private state: AppStateService,
    ) {}

  canActivate(): boolean 
  {
    if (this.auth.isLoggedIn()) 
    {
      this.router.navigate(['bookings']);
      return false;
    }

    return true;
  }
}