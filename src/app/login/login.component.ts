import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private clientService: ClientService
    ) { }

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.email.value, this.password.value)
  }

  getUser() {
    this.clientService.getClient('277fd464-0929-4991-9814-a4f1fe8dca17')
      .subscribe(res => console.log(res)); // new Client model
  }
}
