import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '../models/client.model';
import { AuthService } from '../services/auth/auth/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /*
   TODO:

   - snack bar notification for success / failure (create snackbar notification service from bl)
   - implement continue with provider
   - implement forgot your password
   - 
  */

  @ViewChild('authForm') authForm: NgForm;

  isLogin = true;

  name = '';
  email = '';
  phone = '';
  password = '';

  constructor(
    private auth: AuthService,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void 
  {
  }

  async login(): Promise<void> 
  {
    if (this.authForm.invalid) return;

    await this.auth.loginWithEmail(this.email, this.password);
  }

  async register(): Promise<void>
  {
    if (this.authForm.invalid) return;

    await this.auth.registerWithEmail(this.name, this.email, this.password, this.phone);
  }

  async getClient(): Promise<Client>
  {
    return await this.clientService.getAuthedClient();
  }

  toggleAction(): void
  {
    this.isLogin = !this.isLogin;
  }

  getToggleLabel(): string
  {
    return this.isLogin 
      ? 'Register'
      : 'Sign in';
  }

  getTitle(): string
  {
    return !this.isLogin 
      ? 'Register'
      : 'Sign in';
  }
}
