import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);

  constructor(private api: ApiService) { }

  ngOnInit(): void {}

  login(): void {
    this.api.login({
      username: this.email.value,
      password: this.password.value
    }).subscribe(response => console.log(response))
  }

}
