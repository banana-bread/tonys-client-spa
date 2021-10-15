import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  first_name: FormControl = new FormControl('', [Validators.required]);
  last_name: FormControl = new FormControl('');
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);

  constructor(private auth: AuthService) { }

  ngOnInit(): void {}

  register(): void 
  {
    this.auth.registerWithEmail(this.first_name.value, this.last_name.value, this.email.value, this.password.value)
  }

}
