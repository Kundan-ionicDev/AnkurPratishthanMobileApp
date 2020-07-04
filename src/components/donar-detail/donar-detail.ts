import { Component } from '@angular/core';

/**
 * Generated class for the DonarDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'donar-detail',
  templateUrl: 'donar-detail.html'
})
export class DonarDetailComponent {

  text: string;

  constructor() {
    console.log('Hello DonarDetailComponent Component');
    this.text = 'Hello World';
  }

}
