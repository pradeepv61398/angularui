import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policy } from '../component/create-policy/create-policy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private baseUrl = 'https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/api/customer-policies';
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createPolicy(policy: Policy): Observable<any> {
    return this.http.post(
      "https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/policy/createPolicy", 
      policy, 
      { headers: this.getAuthHeaders() }
    );
  }

  viewPolicy(): Observable<Policy[]> {
    return this.http.get<Policy[]>(
      "https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/policy/getAllPolices", 
      { headers: this.getAuthHeaders() }
    );
  }

  buyPolicy(customerId: number, policyId: number): Observable<any> {
    return this.http.post(
      `https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/api/customer-policies/buy?customerId=${customerId}&policyId=${policyId}`,
      {}, // empty body
      { headers: this.getAuthHeaders() }
    );
  }

  getAllCustomerPolicies(customerId: number): Observable<Policy[]> {
    return this.http.get<Policy[]>(
      `https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/api/customer-policies/${customerId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getPayments(customerPolicyId: number): Observable<PolicyPayment[]> {
    return this.http.get<PolicyPayment[]>(
      `${this.baseUrl}/payments/${customerPolicyId}`, 
      { headers: this.getAuthHeaders() }
    );
  }

  payInstallment(paymentId: number): Observable<PolicyPayment> {
    return this.http.post<PolicyPayment>(
      `${this.baseUrl}/payments/pay/${paymentId}`, 
      {}, 
      { headers: this.getAuthHeaders() }
    );
  }
}

export interface PolicyPayment { 
  id: number; 
  customerPolicyId: number; 
  installmentYear: number; 
  amount: number; 
  dueDate: string;
  paid?: boolean; 
  status?: 'PENDING' | 'PAID' | 'FAILED' | 'LATE'; 
  paymentDate?: string;
}
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Policy } from '../component/create-policy/create-policy';

// @Injectable({
//   providedIn: 'root'
// })
// export class PolicyService {
//     private baseUrl = 'https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/api/customer-policies';

//   constructor(
//     private http: HttpClient
//   ) {

//   }
//   createPolicy(policy: Policy) {
//     return this.http.post("https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/policy/createPolicy", policy, { withCredentials: true });

//   }
//   viewPolicy() {
//     return this.http.get<Policy[]>("https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/policy/getAllPolices", { withCredentials: true });

//   }
//   // buyPolicy(policyId: number){
//   //   return this.http.post("http://localhost:8080/policy/buyPolicy", { withCredentials: true });
//   // }
  

// buyPolicy(customerId: number, policyId: number) {
//   return this.http.post(
//     `https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/api/customer-policies/buy?customerId=${customerId}&policyId=${policyId}`,
//     {}, // empty body
//     { withCredentials: true }
//   );
// }
//   getAllCustomerPolicies(customerId: number) {
//   return this.http.get<Policy[]>(
//     `https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/api/customer-policies/${customerId}`,
//     { withCredentials: true }
//   );




// }

//   getPayments(customerPolicyId: number) {
//     return this.http.get<PolicyPayment[]>(`${this.baseUrl}/payments/${customerPolicyId}`, { withCredentials: true });
//   }

//   payInstallment(paymentId: number) {
//     return this.http.post<PolicyPayment>(`${this.baseUrl}/payments/pay/${paymentId}`, {}, { withCredentials: true });
//   }




// }
// export interface PolicyPayment { 
//   id: number; customerPolicyId: number; installmentYear: number; amount: number; dueDate: string; }
//   // ISO string paid: boolean; status: 'PENDING' | 'PAID' | 'FAILED' | 'LATE'; paymentDate?: string;   }