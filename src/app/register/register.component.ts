import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.api.register({
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    }).subscribe(response => console.log(response))
  }

}
