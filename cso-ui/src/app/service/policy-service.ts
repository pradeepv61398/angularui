import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policy } from '../component/create-policy/create-policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
    private baseUrl = 'http://localhost:8080/api/customer-policies';

  constructor(
    private http: HttpClient
  ) {

  }
  cretepolciy(policy: Policy) {
    return this.http.post("http://localhost:8080/policy/createPolicy", policy, { withCredentials: true });

  }
  viewpolicy() {
    return this.http.get<Policy[]>("http://localhost:8080/policy/getAllPolices", { withCredentials: true });

  }
  // buyPolicy(policyId: number){
  //   return this.http.post("http://localhost:8080/policy/buyPolicy", { withCredentials: true });
  // }
  

buyPolicy(customerId: number, policyId: number) {
  return this.http.post(
    `http://localhost:8080/api/customer-policies/buy?customerId=${customerId}&policyId=${policyId}`,
    {}, // empty body
    { withCredentials: true }
  );
}
  getAllCustomerPolicies(customerId: number) {
  return this.http.get<Policy[]>(
    `http://localhost:8080/api/customer-policies/${customerId}`,
    { withCredentials: true }
  );




}

  getPayments(customerPolicyId: number) {
    return this.http.get<PolicyPayment[]>(`${this.baseUrl}/payments/${customerPolicyId}`, { withCredentials: true });
  }

  payInstallment(paymentId: number) {
    return this.http.post<PolicyPayment>(`${this.baseUrl}/payments/pay/${paymentId}`, {}, { withCredentials: true });
  }




}
export interface PolicyPayment { 
  id: number; customerPolicyId: number; installmentYear: number; amount: number; dueDate: string; }
  // ISO string paid: boolean; status: 'PENDING' | 'PAID' | 'FAILED' | 'LATE'; paymentDate?: string;   }