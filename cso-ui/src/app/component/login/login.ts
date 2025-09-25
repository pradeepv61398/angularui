import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule,RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
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

  // onSubmit() {
  //   if (this.LoginForm.valid) {
  //     this.http.post('https://frontend-cwdpc4gsgyfna2g5.z02.azurefd.net/api/login', this.LoginForm.value, { withCredentials: true })
  //       .subscribe(
  //         response => {
  //           console.log('Login successful', response);
  //           this.LoginForm.reset();
  //           this.message = 'Login successful!';
  //           this.router.navigate(['/dashboard']); // redirect
  //         },
  //         error => {
  //           console.error('Login failed', error);
  //           this.message = 'Login failed. Please try again.';
  //         }
  //       );
  //   } else {
  //     console.log('Form not valid');
  //   }
  // }
  onSubmit() {
  if (this.LoginForm.valid) {
    this.http.post<{ token: string }>(
      'https://frontend-cwdpc4gsgyfna2g5.z02.azurefd.net/jwt/login',
      this.LoginForm.value
    ).subscribe({
      next: response => {
        console.log('JWT Login successful', response);
        localStorage.setItem('jwt', response.token); // save token
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Login failed', err);
        this.message = 'Login failed. Please try again.';
      }
    });
  }
}
}
