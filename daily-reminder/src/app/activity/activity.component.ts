import { sha1 } from '@angular/compiler/src/i18n/digest';
import { Component, OnInit } from '@angular/core';

import { Activity } from '../activity';
import { ACTIVITIES } from '../mock-activities';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: [
    '../app.component.css',
    './activity.component.css'
  ]
})
export class ActivityComponent implements OnInit {

  activities: Activity[] = ACTIVITIES;
  selectedActivity?: Activity;
  newActivity: Activity = {name: "", daysInARow: 0, id: 0};

  constructor() { }

  ngOnInit(): void {}

  onSelect(activity: Activity): void {
    if (this.selectedActivity === activity) {
      this.selectedActivity = undefined;
    } else {
      this.selectedActivity = activity;
    }
  }

  addNewActivity(): void {
    if (this.newActivity?.name) {
      this.activities.push(this.newActivity);
      this.newActivity = {name: "", daysInARow: 0, id: 0};
    }
  }

  decrementDaysInARow(): void {
    if (this.selectedActivity) {
      if (this.selectedActivity?.daysInARow) {
        this.selectedActivity.daysInARow = Math.max(this.selectedActivity.daysInARow - 1, 0);
      } else {
        this.selectedActivity.daysInARow = 0;
      }
    }
  }

  incrementDaysInARow(): void {
    if (this.selectedActivity) {
      if (this.selectedActivity?.daysInARow) {
        this.selectedActivity.daysInARow += 1;
      } else {
        this.selectedActivity.daysInARow = 1;
      }
    }
  }

}
