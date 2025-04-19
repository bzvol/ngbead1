import {Component} from '@angular/core';
import {configuration} from "../../../configuration/configuration";
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
    selector: 'app-task4-a',
    templateUrl: './task4-a.component.html',
    styleUrls: ['./task4-a.component.less'],
    standalone: false
})
export class Task4AComponent {
  readonly legendPosition = LegendPosition.Below;

  constructor() { }

  get solvedTasks() {
    return configuration
      .flatMap((task, index) => [
        {taskNumber: `${index + 1}. A feladat`, task: task.A},
        {taskNumber: `${index + 1}. B feladat`, task: task.B}
      ])
      .filter(taskObj => Object.values(taskObj.task.subTasks).some(value => value))
      .map(taskObj => ({
        name: taskObj.taskNumber,
        value: Object.values(taskObj.task.subTasks)
          .filter(value => value)
          .length
      }));
  }
}
