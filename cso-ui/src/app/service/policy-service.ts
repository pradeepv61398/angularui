import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policy } from '../component/create-policy/create-policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
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
  buyPolicy(policyId: number){
    return this.http.post("http://localhost:8080/policy/buyPolicy", { withCredentials: true });
  }


}