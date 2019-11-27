import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookdetailsPage } from './bookdetails';

@NgModule({
  declarations: [
    BookdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookdetailsPage),
  ],
})
export class BookdetailsPageModule {}
