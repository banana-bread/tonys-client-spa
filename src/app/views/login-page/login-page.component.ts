import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  title = 'Sign in';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void 
  {
  }

  onLoggedIn() 
  {
    this.router.navigate(['bookings'])
  }

  onLoginSelected()
  {
    this.title = 'Sign in'
  }

  onRegisterSelected()
  {
    this.title = 'Register'
  }
}
