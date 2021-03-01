import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { HttpClientModule } from '@angular/common/http';
import { SignupService } from '../services/signup.service';
import { OtpModalComponent } from '../otp-modal/otp-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [SignupPage, OtpModalComponent],
  providers: [SignupService],
})
export class SignupPageModule {}
