import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageOrphanePage } from './manage-orphane';

@NgModule({
  declarations: [
    ManageOrphanePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageOrphanePage),
  ],
})
export class ManageOrphanePageModule {}
