import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppStateService } from '../../services/app-state.service';
import { AuthService } from '../../services/auth.service';
import { SnackbarNotificationService } from '@tonys-barbers/shared';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ForgotPasswordService } from '../forgot-password-dialog/forgot-password.component';
import { ReCaptchaService } from 'angular-recaptcha3';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('authForm') authForm: NgForm;
  @Output() loggedIn = new EventEmitter<void>();
  
  loading = false;
  title = 'Create your free account';
  isLoginView = true;
  isEmailSignupView = false;
  isNotMobile: boolean;

  first_name = '';
  last_name = '';
  email = '';
  phone: string;
  password = '';

  constructor(
    private auth: AuthService,
    private snackbarNotification: SnackbarNotificationService,
    private appState: AppStateService,
    private forgotPasswordService: ForgotPasswordService,
    private recaptchaService: ReCaptchaService,
    private apiService: ApiService,
    public breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void 
  {
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isNotMobile = !state.matches;
      });
  }

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

      this.loggedIn.emit()
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
      this.appState.setLoggedIn(true);
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
      const token = await this.recaptchaService.execute();
      const response = await this.apiService.verifyRecaptcha({token});

      if (! response.data.success)
      {
        this.snackbarNotification.error('We detected a robot.')
        return;
      }

      await this.auth.registerWithEmail(this.first_name, this.last_name, this.email, this.password, this.phone);
      this.snackbarNotification.success('Registration successful!')
      await this.auth.loginWithEmail(this.email, this.password);
      this.appState.setLoggedIn(true);
    }
    catch (e)
    {
      this.snackbarNotification.error(e.error.message)
    }
  }

  onForgotPassword()
  {
    this.forgotPasswordService.open();
  }

  // async continueWithGoogle()
  // {
  //   console.log('continuing with google!')
  //   await this.auth.loginWithProvider('google');
  // }

  // async continueWithFacebook()
  // {
  //   console.log('continuing with facebook!')
  //   // await this.auth.loginWithProvider('facebook');
  // }

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
