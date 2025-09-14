import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  title = 'Login';
  LoginForm!: FormGroup;
  message: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    this.LoginForm = formBuilder.group({
      email: ['', Validators.required], // ✅ match backend
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.LoginForm.valid) {
      this.http.post('http://localhost:8080/api/login', this.LoginForm.value, { withCredentials: true })
        .subscribe(
          response => {
            console.log('Login successful', response);
            this.LoginForm.reset();
            this.message = 'Login successful!';
            this.router.navigate(['/dashboard']); // redirect
          },
          error => {
            console.error('Login failed', error);
            this.message = 'Login failed. Please try again.';
          }
        );
    } else {
      console.log('Form not valid');
    }
  }
}
