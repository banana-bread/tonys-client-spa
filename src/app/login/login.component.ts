import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppStateService } from '../app-state.service';
import { Client } from '../models/client.model';
import { AuthService } from '../services/auth/auth/auth.service';
import { ClientService } from '../services/client.service';
import { SnackbarNotificationService } from '../services/notifications/snackbar-notifications/snackbar-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /*
   TODO:
   - implement continue with provider
   - implement forgot your password
   - implement captcha for email login
  */

  @ViewChild('authForm') authForm: NgForm;
  @Output() loggedIn = new EventEmitter<null>();

  
  loading = false;
  title = 'Create your free account';
  isLoginView = false;
  isEmailSignupView = false;

  name = '';
  email = '';
  phone = '';
  password = '';

  constructor(
    private auth: AuthService,
    private clientService: ClientService,
    private snackbarNotification: SnackbarNotificationService,
    private appState: AppStateService,
  ) { }

  ngOnInit(): void {}

  setLoading(isLoading: boolean)
  {
    this.loading = isLoading;
    this.appState.setLoading(this.loading);
  }

  async onSubmit(): Promise<void|null>
  {
    if (this.authForm.invalid) return;

    this.setLoading(true);

    try
    {
      this.isEmailSignupView 
        ? await this.register()
        : await this.login();

      this.loggedIn.emit();
    }
    finally
    {
      this.setLoading(false);
    }
  }

  protected async login(): Promise<void> 
  {
    try
    {
      await this.auth.loginWithEmail(this.email, this.password);
      this.snackbarNotification.success('Log in successful!');
    }
    catch
    {
      this.snackbarNotification.error('Error logging in');
    }
  }

  protected async register(): Promise<void>
  {
    try
    {
      await this.auth.registerWithEmail(this.name, this.email, this.password, this.phone);
      this.snackbarNotification.success('Registration successful!')
      await this.auth.loginWithEmail(this.email, this.password);
    }
    catch
    {
      this.snackbarNotification.error('Error registering')
    }
  }

  async continueWithGoogle()
  {
    console.log('continuing with google!')
    // await this.auth.loginWithProvider('google');
  }

  async continueWithFacebook()
  {
    console.log('continuing with facebook!')
    // await this.auth.loginWithProvider('facebook');
  }

  toggleLogin(): void
  {
    this.isLoginView = true;
    this.isEmailSignupView = false;
    this.authForm.resetForm();
  }

  toggleEmailSignup()
  {
    this.isEmailSignupView = true;
    this.isLoginView = false;
    this.authForm.resetForm();
  }

  getTitle(): string
  {
    return this.isLoginView
      ? 'Sign in to your account'
      : 'Create your free account'
  }
}
