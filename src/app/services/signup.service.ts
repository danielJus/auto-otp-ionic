import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  isOtpValidSubject = new Subject<boolean>();
  private otpValues;

  constructor(private http: HttpClient) {}

  getOtpValues() {
    return this.otpValues;
  }
  setOtpValues(otp) {
    const valuesArray: string[] = otp.split('');
    const auxObj = {};

    valuesArray.map((val, i) => {
      auxObj[`otp${i + 1}`] = val;
    });
    this.otpValues = auxObj;
  }

  getOtpMessage(appHash: string, phone: string): Observable<any> {
    return this.http.post(
      'https://auto-otp-server.herokuapp.com/generate-message',
      {
        appHash,
        phone,
      }
    );
  }

  validateOtp(otp: string): Observable<any> {
    return this.http.post(
      'https://auto-otp-server.herokuapp.com/validate-otp',
      {
        otp,
      }
    );
  }
}
