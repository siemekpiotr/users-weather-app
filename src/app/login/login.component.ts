import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[0-9]).{8,}')]]
    });
  }

  loginUser(): void {
    console.log(this.loginForm.value);
    this.auth.loginUser(this.loginForm.value).subscribe(
      res => {
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/']);
      },
      err => console.log(err)
    );
  }

}
