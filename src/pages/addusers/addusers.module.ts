import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddusersPage } from './addusers';

@NgModule({
  declarations: [
    AddusersPage,
  ],
  imports: [
    IonicPageModule.forChild(AddusersPage),
  ],
})
export class AddusersPageModule {}
