import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authservice';
import { PolicyService } from '../../service/policy-service';
import { CreatePolicy } from '../create-policy/create-policy';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { ClaimSubmissionComponent } from '../claim-submission-component/claim-submission-component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatChipsModule,
    MatGridListModule,
    CreatePolicy,
    ClaimSubmissionComponent,
    MatTableModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  providers: [AuthService]
})
export class Dashboard implements OnInit {
  LoggedinUser!: any;
  policies: any[] = [];
  selectedPolicyPayments: any[] = [];
  selectedPolicyId!: number;

  constructor(
    private authService: AuthService,
    private policyService: PolicyService,
   
  ) {}

  ngOnInit(): void {
    this.authService.loadCurrentUser();
    this.authService.currentUser$.subscribe(user => {
      this.LoggedinUser = user;
      if (user?.id) {
        this.loadPolicies(user.id);
      }
    });
  }

  loadPolicies(userId: number) {
    this.policyService.getAllCustomerPolicies(userId).subscribe({
      next: (data: any[]) => this.policies = data,
      error: err => console.error('Error fetching policies:', err)
    });
  }

  // Load payments for a specific policy
  loadPayments(policyId: number) {
    this.selectedPolicyId = policyId;
    this.policyService.getPayments(policyId).subscribe({
      next: (payments: any[]) => this.selectedPolicyPayments = payments,
      error: err => console.error('Error fetching payments:', err)
    });
  }

  // Pay an installment
  payInstallment(paymentId: number) {
    this.policyService.payInstallment(paymentId).subscribe({
      next: (updatedPayment: any) => {
        const index = this.selectedPolicyPayments.findIndex(p => p.id === paymentId);
        if (index >= 0) this.selectedPolicyPayments[index] = updatedPayment;
      },
      error: err => console.error('Error paying installment:', err)
    });
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'Active':
        return 'primary';
      case 'Pending':
        return 'accent';
      case 'Expired':
        return 'warn';
      default:
        return '';
    }
  }

  getPaymentStatusColor(status: string) {
    switch (status) {
      case 'PAID':
        return 'green';
      case 'PENDING':
        return 'orange';
      case 'LATE':
        return 'red';
      default:
        return 'gray';
    }
  }
}
