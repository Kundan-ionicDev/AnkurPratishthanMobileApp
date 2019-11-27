import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageRequestsPage } from './manage-requests';

@NgModule({
  declarations: [
    ManageRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageRequestsPage),
  ],
})
export class ManageRequestsPageModule {}
