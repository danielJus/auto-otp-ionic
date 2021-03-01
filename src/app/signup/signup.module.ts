import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { HttpClientModule } from '@angular/common/http';
import { SignupService } from '../services/signup.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [SignupPage],
  providers: [SignupService],
})
export class SignupPageModule {}
