import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policy } from '../component/create-policy/create-policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
    private baseUrl = 'https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/api/customer-policies';

  constructor(
    private http: HttpClient
  ) {

  }
  createPolicy(policy: Policy) {
    return this.http.post("https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/policy/createPolicy", policy, { withCredentials: true });

  }
  viewPolicy() {
    return this.http.get<Policy[]>("https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/policy/getAllPolices", { withCredentials: true });

  }
  // buyPolicy(policyId: number){
  //   return this.http.post("http://localhost:8080/policy/buyPolicy", { withCredentials: true });
  // }
  

buyPolicy(customerId: number, policyId: number) {
  return this.http.post(
    `https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/api/customer-policies/buy?customerId=${customerId}&policyId=${policyId}`,
    {}, // empty body
    { withCredentials: true }
  );
}
  getAllCustomerPolicies(customerId: number) {
  return this.http.get<Policy[]>(
    `https://insuranceportal-cmcudyhtbqh7djh2.canadacentral-01.azurewebsites.net/api/customer-policies/${customerId}`,
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