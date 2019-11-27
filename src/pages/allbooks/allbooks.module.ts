import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllbooksPage } from './allbooks';

@NgModule({
  declarations: [
    AllbooksPage,
  ],
  imports: [
    IonicPageModule.forChild(AllbooksPage),
  ],
})
export class AllbooksPageModule {}
