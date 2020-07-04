import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MydonorsPage } from './mydonors';

@NgModule({
  declarations: [
    MydonorsPage,
  ],
  imports: [
    IonicPageModule.forChild(MydonorsPage),
  ],
})
export class MydonorsPageModule {}
