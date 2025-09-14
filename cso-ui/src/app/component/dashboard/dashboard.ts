import { Component } from '@angular/core';
import { AuthService } from '../../service/authservice';
import { CreatePolicy } from '../create-policy/create-policy';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard',
  imports: [CreatePolicy,MatFormFieldModule,MatToolbarModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule,ReactiveFormsModule,FormsModule,CommonModule,MatDividerModule,MatIconModule,RouterLink,RouterLinkActive
    ,MatListModule,MatListItem,MatChipsModule,MatChipListbox,MatGridListModule,MatGridList
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  providers: [AuthService]
})
export class Dashboard {
  LoggedinUser!: any;
   policies: any[] = [];


  constructor(private authService: AuthService) {
    this.authService.loadCurrentUser();
     this.authService.currentUser$.subscribe(user => {
      this.LoggedinUser = user;
    });
  }
  getStatusColor(status: string) {
  switch(status) {
    case 'Active': return 'primary';
    case 'Pending': return 'accent';
    case 'Expired': return 'warn';
    default: return '';
  }
}



    
}
