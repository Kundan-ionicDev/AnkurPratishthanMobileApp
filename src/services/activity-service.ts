import {Injectable} from "@angular/core";
import { TRIPS } from "../services/clusterdetails";

@Injectable()
export class ActivityService {
  private activities: any;
  private trips: any;
  constructor() {
    this.trips = TRIPS;
  }

  getAll() {
    return this.activities;
  }

  getItem(id) {
    for (var i = 0; i < this.trips.length; i++) {
      if (this.trips[i].id === parseInt(id)) {
        return this.trips[i];
      }
    }
    return null;
  }


  remove(item) {
    this.activities.splice(this.activities.indexOf(item), 1);
  }

 
}
