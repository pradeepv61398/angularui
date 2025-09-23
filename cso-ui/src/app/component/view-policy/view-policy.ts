import { Component } from '@angular/core';
import { PolicyService } from '../../service/policy-service';
import { Policy } from '../create-policy/create-policy';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/authservice';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-view-policy',
  imports: [MatTableModule,MatToolbarModule,CommonModule,MatChipsModule,MatIconModule,RouterLink,RouterLinkActive],
  templateUrl: './view-policy.html',
  styleUrl: './view-policy.css'
})
export class ViewPolicy {

 policies: Policy[] = []; 
 displayedColumns: string[] = ['policyNumber', 'name', 'type', 'coverage', 'premium', 'term', 'description','buy'];
 LoggedinUser!: any;
  constructor(private policyService: PolicyService,private authService: AuthService){
    this.authService.loadCurrentUser();
     this.authService.currentUser$.subscribe(user => {
      this.LoggedinUser = user;
  }
)
  }
ngOnInit(): void {
  this.loadPolicies();
}

loadPolicies(): void {
    this.policyService.viewPolicy().subscribe({
      next: (data: Policy[]) => {
        this.policies = data;
      },
      error: (err) => {
        console.error('Error fetching policies:', err);
      }
    });
  }
getPolicyColor(type: string): 'primary' | 'accent' | 'warn' {
  switch(type.toLowerCase()) {
    case 'health': return 'primary';
    case 'life': return 'accent';
    case 'car': return 'warn';
    case 'travel': return 'primary';
    default: return 'primary';
  }
}
selectedPolicyId!: number; // optional if using dropdown

buyPolicy(policyId: number) {
  this.policyService.buyPolicy(this.LoggedinUser.id,policyId).subscribe({
    next: (res: any) => {
      alert('Policy purchased successfully!');
      this.loadPolicies(); // reload policies if needed
    },
    error: (err) => {
      console.error('Error buying policy:', err);
      alert('Failed to purchase policy.');
    }
  });
}


  
  
}
