import { Component, OnInit } from '@angular/core';

import { Activity } from '../activity';
import { ActivityService } from '../activity.service'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: [
    '../app.component.css',
    './activity.component.css'
  ]
})
export class ActivityComponent implements OnInit {

  activities: Activity[] = [];
  selectedActivity?: Activity;
  newActivity: Activity = {name: "", daysInARow: 0, id: 0};

  constructor(
    private activityService: ActivityService) { }

  ngOnInit(): void {
   this.activityService.getActivities().subscribe(activities => this.activities = activities);
  }

  onSelect(activity: Activity): void {
    this.updateActivity();
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

  updateActivity(): void {
    if (this.selectedActivity) {
      this.activityService.updateActivity(this.selectedActivity).subscribe(activity => {
        this.selectedActivity = activity;
      });
    }
  }

}
