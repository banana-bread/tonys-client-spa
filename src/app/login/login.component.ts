import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ClientService } from '../services/client.service';
import { TimeSlotService } from '../services/time-slot.service';

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
    private clientService: ClientService) { }

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.email.value, this.password.value)
  }

  getClient() {
    this.clientService.getAuthedClient()
      .subscribe(res => console.log(res)); // new Client model
  }
}
