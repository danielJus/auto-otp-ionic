import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  hash: any;
  constructor(
    private signupService: SignupService,
    private smsRetriever: SmsRetriever,
    private router: Router
  ) {}

  ngOnInit() {}

  genHash() {
    // This function is to get hash string of APP.
    // * @return {Promise<string>} Returns a promise that resolves when successfully generate hash of APP.

    // this.signupService
    //   .getOtpMessage('198237idjs')
    //   .subscribe((val) => console.log(val));
    this.smsRetriever
      .getAppHash()
      .then((res: any) => {
        console.log(res);
        this.hash = res;
        this.signupService.getOtpMessage(this.hash).subscribe((val) => {
          alert(this.hash);
          console.log(val);

          if (val.message === 'success') {
            this.retriveSMS();
          }
        });
      })
      .catch((error: any) => console.error(error));
  }

  retriveSMS() {
    console.log('Watching SMS');
    this.smsRetriever
      .startWatching()
      .then((res: any) => {
        console.log(res);
        //  <#> 323741 is your 6 digit OTP for MyApp. LDQEGVDEvcl
        const otp = res.Message.toString().substr(4, 6);
        this.signupService.validateOtp(otp).subscribe((val) => {
          if (val.message === 'success') {
            this.router.navigateByUrl('/dashboard');
          } else {
            alert(`Wrong OTP`);
          }
          alert(`OTP Received - ${otp}`);
        });
      })
      .catch((error: any) => console.error(error));
  }
}
