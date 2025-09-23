
import { Injectable } from '@angular/core';
import { HttpClient ,HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  // any other fields you want
}

@Injectable({
  providedIn: 'root'

})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  loadCurrentUser() {
    this.http.get<User>('https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/api/me', { withCredentials: true })
      .subscribe({
        next: user => this.currentUserSubject.next(user),
        error: err => {
          this.currentUserSubject.next(null);
          this.router.navigate(['/login']);
        }
      });
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}



