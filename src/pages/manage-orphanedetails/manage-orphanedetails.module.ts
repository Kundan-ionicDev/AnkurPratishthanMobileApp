import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageOrphanedetailsPage } from './manage-orphanedetails';

@NgModule({
  declarations: [
    ManageOrphanedetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageOrphanedetailsPage),
  ],
})
export class ManageOrphanedetailsPageModule {}
