import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Client } from '../models/client.model';
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

  async login(): Promise<void> 
  {
    this.authService.login(this.email.value, this.password.value)
  }

  async getClient(): Promise<Client>
  {
    return await this.clientService.getAuthedClient();
  }
}
