import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss'],
})
export class OtpModalComponent implements OnInit {
  form: FormGroup;
  inputs = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6'];

  constructor(
    private signupService: SignupService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
      otp5: ['', Validators.required],
      otp6: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.signupService.isOtpValidSubject.subscribe((val) => {
      if (val) {
        const successfulOtp = this.signupService.getOtpValues();
        this.form.setValue(successfulOtp);
        setTimeout(() => {
          this.router.navigateByUrl('/dashboard');
        }, 2000);
      }
    });
  }
}
