import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagebooksPage } from './managebooks';
import { SuperTabsModule } from 'ionic2-super-tabs';


@NgModule({
  declarations: [
    ManagebooksPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagebooksPage),
    SuperTabsModule
  ],
})
export class ManagebooksPageModule {}
