import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { OtpModalComponent } from '../otp-modal/otp-modal.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  hash: any;
  phone = '';

  constructor(
    private signupService: SignupService,
    private smsRetriever: SmsRetriever,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  genHash() {
    this.openModal();

    this.smsRetriever
      .getAppHash()
      .then((res: any) => {
        this.hash = res;
        this.signupService
          .getOtpMessage(this.hash, this.phone)
          .subscribe((val) => {
            if (val.message === 'success') {
              this.retriveSMS();
            }
          });
      })
      .catch((error: any) => console.error(error));
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: OtpModalComponent,
      cssClass: 'half-screen',
      backdropDismiss: false,
    });
    return await modal.present();
  }

  retriveSMS() {
    this.smsRetriever
      .startWatching()
      .then((res: any) => {
        console.log(res);
        const receivedOtp = res.Message.toString()
          .split(' ')
          .filter((item) => item === '323741')[0];
        this.signupService.validateOtp(receivedOtp).subscribe((val) => {
          if (val.message === 'success') {
            this.signupService.setOtpValues(receivedOtp);
            this.signupService.isOtpValidSubject.next(true);
          } else {
            alert(`Wrong OTP`);
          }
        });
      })
      .catch((error: any) => console.error(error));
  }
}
