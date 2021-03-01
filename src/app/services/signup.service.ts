import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  getOtpMessage(appHash: string): Observable<any> {
    return this.http.post('http://localhost:3000/generate-message', {
      appHash,
    });
  }

  validateOtp(otp: string): Observable<any> {
    return this.http.post('http://localhost:3000/validate-otp', {
      otp,
    });
  }
}
