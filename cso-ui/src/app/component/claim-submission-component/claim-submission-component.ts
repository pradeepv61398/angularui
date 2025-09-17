import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { Dashboard } from '../dashboard/dashboard';
import { AuthService } from '../../service/authservice';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-claim-submission-component',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
    
    
  ],
  templateUrl: './claim-submission-component.html',
  styleUrls: ['./claim-submission-component.css'],
    providers:[AuthService]

})
export class ClaimSubmissionComponent {
  claimForm!: FormGroup;
  claimTypes = ['HEALTH', 'CAR', 'LIFE'];
  customerPolicies: any[] = []; // fetched from backend
  message!: string;
  LoggedinUser!: any;


  constructor(private fb: FormBuilder, private http: HttpClient,private authService: AuthService) {}

  ngOnInit(): void {
     this.authService.loadCurrentUser();
    this.authService.currentUser$.subscribe(user => {
      this.LoggedinUser = user;
      if (user?.id) {
                this.http.get<any[]>(`http://localhost:8080/api/customer-policies/${user.id}`, { withCredentials: true })
  .subscribe({
    next: (data) => this.customerPolicies = data,
    error: (err) => console.error('Error fetching customer policies', err)
  });
        
      }


      
    });
    // Initialize form
    
    this.claimForm = this.fb.group({
      customerPolicyId: ['', Validators.required], // Updated
      claimType: ['', Validators.required],
      amount: ['', Validators.required],
      reason: [''],
      // Health fields
      hospitalName: [''],
      admissionDate: [''],
      dischargeDate: [''],
      patientName: [''],
      doctorName: [''],
      // Car fields
      vehicleNumber: [''],
      accidentDate: [''],
      location: [''],
      garageName: [''],
      firNumber: [''],
      // Life fields
      nomineeName: [''],
      relationship: [''],
      deathCertificateNumber: [''],
      dateOfDeath: ['']
    });

    // Fetch customer policies for dropdown


    // Watch for claimType changes
    this.claimForm.get('claimType')?.valueChanges.subscribe(type => {
      this.setValidatorsByType(type);
    });

    // Watch reason for FIR requirement in Car claims
    this.claimForm.get('reason')?.valueChanges.subscribe(reason => {
      this.updateFIRValidation(reason);
    });
  }

  setValidatorsByType(type: string) {
    // Reset all
    [
      'hospitalName', 'admissionDate', 'dischargeDate', 'patientName', 'doctorName',
      'vehicleNumber', 'accidentDate', 'location', 'garageName', 'firNumber',
      'nomineeName', 'relationship', 'deathCertificateNumber', 'dateOfDeath'
    ].forEach(f => this.claimForm.get(f)?.clearValidators());

    if (type === 'HEALTH') {
      ['hospitalName', 'admissionDate', 'dischargeDate', 'patientName', 'doctorName']
        .forEach(f => this.claimForm.get(f)?.setValidators(Validators.required));
    } else if (type === 'CAR') {
      ['vehicleNumber', 'accidentDate', 'location', 'garageName']
        .forEach(f => this.claimForm.get(f)?.setValidators(Validators.required));
    } else if (type === 'LIFE') {
      ['nomineeName', 'relationship', 'deathCertificateNumber', 'dateOfDeath']
        .forEach(f => this.claimForm.get(f)?.setValidators(Validators.required));
    }

    this.claimForm.updateValueAndValidity();
  }

  updateFIRValidation(reason: string) {
    const firControl = this.claimForm.get('firNumber');
    if (this.claimForm.get('claimType')?.value === 'CAR') {
      const isCritical = reason?.toLowerCase().includes('theft') || reason?.toLowerCase().includes('injury');
      if (isCritical) {
        firControl?.setValidators([Validators.required]);
      } else {
        firControl?.clearValidators();
      }
      firControl?.updateValueAndValidity();
    }
  }

  submitClaim() {
    if (this.claimForm.valid) {
      console.log('Submitting claim:', this.claimForm.value);

      this.http.post('http://localhost:8080/claims/submit', this.claimForm.value, { withCredentials: true })
        .subscribe({
          next: (response) => {
            console.log('Response:', response);
            this.message = 'Claim submitted successfully!';
            this.claimForm.reset();
          },
          error: (error) => {
            console.error('Error submitting claim:', error);
            this.message = 'Failed to submit claim. Please try again.';
          }
        });
    } else {
      console.log('Form is invalid');
      this.claimForm.markAllAsTouched();
    }
  }
}
