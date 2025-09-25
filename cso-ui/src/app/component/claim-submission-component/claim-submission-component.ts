import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
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
  providers: [AuthService]
})
export class ClaimSubmissionComponent {
  claimForm!: FormGroup;
  claimTypes = ['HEALTH', 'CAR', 'LIFE'];
  customerPolicies: any[] = [];
  message!: string;
  LoggedinUser!: any;
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  private tokenKey = 'jwt_token';

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getAuthHeadersForFormData(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // Note: Don't set Content-Type for FormData - browser will set it automatically with boundary
    });
  }

  ngOnInit(): void {
    this.authService.loadCurrentUser();
    this.authService.currentUser$.subscribe(user => {
      this.LoggedinUser = user;
      if (user?.id) {
        this.http.get<any[]>(
          `https://frontend-cwdpc4gsgyfna2g5.z02.azurefd.net/api/customer-policies/${user.id}`, 
          { headers: this.getAuthHeaders() }
        ).subscribe({
          next: data => this.customerPolicies = data,
          error: err => console.error('Error fetching customer policies', err)
        });
      }
    });

    this.claimForm = this.fb.group({
      customerPolicyId: ['', Validators.required],
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

    this.claimForm.get('claimType')?.valueChanges.subscribe(type => {
      this.setValidatorsByType(type);
    });

    this.claimForm.get('reason')?.valueChanges.subscribe(reason => {
      this.updateFIRValidation(reason);
    });
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.claimForm.patchValue({ file: file });
    }
  }

  setValidatorsByType(type: string) {
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

  // File change handler for multiple files
  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  submitClaim() {
    if (this.claimForm.valid) {
      const claimData = { ...this.claimForm.value };
      delete claimData['file']; // remove file key if it exists

      const formData = new FormData();

      // Append claim JSON as a Blob
      formData.append('claim', new Blob([JSON.stringify(claimData)], { type: 'application/json' }));

      // Append all selected files
      this.selectedFiles.forEach(file => {
        formData.append('files', file); // 'files' must match backend @RequestPart("files")
      });

      this.http.post(
        'https://frontend-cwdpc4gsgyfna2g5.z02.azurefd.net/claims/submit', 
        formData, 
        { headers: this.getAuthHeadersForFormData() }
      ).subscribe({
        next: (response) => {
          this.message = 'Claim submitted successfully!';
          this.claimForm.reset();
          this.selectedFiles = [];
        },
        error: (error) => {
          console.error('Error submitting claim:', error);
          this.message = 'Failed to submit claim. Please try again.';
        }
      });

    } else {
      this.claimForm.markAllAsTouched();
    }
  }
}