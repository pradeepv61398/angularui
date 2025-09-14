import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,
  RouterLink,
  RouterLinkActive,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
MatRadioModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class Register {
  Registeration!: FormGroup;
  message: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { 
    this.Registeration = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', [Validators.required, Validators.pattern('male|female')]],
      dateOfBirth: ['', Validators.required]
    });
  }

onSubmit() {
  if (this.Registeration.valid) {
    this.http.post('http://localhost:8080/api/register', this.Registeration.value)
      .subscribe(
        response => {
          console.log('User registered successfully', response);
          // Reset the form
          this.Registeration.reset();
          // Optionally, show a success message
          this.message = 'Registration successful!';
        },
        error => {
          console.error('Error registering user', error);
          this.message = 'Registration failed. Please try again.';
        }
      );
  } else {
    console.log('Form not valid');
  }
}

}
