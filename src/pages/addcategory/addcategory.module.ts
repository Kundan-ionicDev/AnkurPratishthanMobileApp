import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddcategoryPage } from './addcategory';
// import { IonTextAvatar } from 'ionic-text-avatar';

@NgModule({
  declarations: [
    AddcategoryPage,
    // IonTextAvatar
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ],
  imports: [
    IonicPageModule.forChild(AddcategoryPage),
  ],
})
export class AddcategoryPageModule {}
