import {Component} from '@angular/core';
import {configuration} from "../../../configuration/configuration";
import {LegendPosition} from "@swimlane/ngx-charts";

type ChartData = {name: string, value: number}[];

@Component({
    selector: 'app-task4-a',
    templateUrl: './task4-a.component.html',
    styleUrls: ['./task4-a.component.less'],
    standalone: false
})
export class Task4AComponent {
  readonly legendPosition = LegendPosition.Below;

  constructor() { }

  get solvedTasks(): ChartData {
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

  get assignmentGrades(): ChartData {
    return [
      {name: "1", value: 5},
      {name: "2", value: 9},
      {name: "3", value: 4},
      {name: "4", value: 6},
      {name: "5", value: 6},
      {name: "Feladta és szégyenli magát", value: 2},
    ];
  }
}
