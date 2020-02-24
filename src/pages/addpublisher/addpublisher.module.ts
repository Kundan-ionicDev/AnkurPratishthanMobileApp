import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddpublisherPage } from './addpublisher';
import { IonTextAvatar } from 'ionic-text-avatar';

@NgModule({
  declarations: [
    AddpublisherPage,
    IonTextAvatar
  ],
  imports: [
    IonicPageModule.forChild(AddpublisherPage),
  ],
})
export class AddpublisherPageModule {}
