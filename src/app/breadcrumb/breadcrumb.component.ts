import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RouterService} from "../_services/router.service";
import {tasks} from "../configuration/tasks";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.less',
  standalone: false
})
export class BreadcrumbComponent implements OnInit {
  readonly taskRange = Array.from({ length: tasks.length }, (_, i) => i + 1);

  page?: 'task' | 'summary';
  taskIndex: number = 1;
  selectedTask?: 'A' | 'B';

  constructor(private route: ActivatedRoute,
              private routerService: RouterService) {
  }

  ngOnInit() {
    this.route.url.subscribe((url) => {
      const page = url[0].path;
      if (page === 'task' || page === 'summary') {
        this.page = page as 'task' | 'summary';
      } else {
        this.page = undefined;
      }
    });

    this.route.params.subscribe((params) => {
      if (params['index']) {
        this.taskIndex = +params['index'];
      }
      if (params['task']) {
        this.selectedTask = params['task'];
      }
    });
  }

  selectTaskIndex(taskIndex: number) {
    this.routerService.routeToTask(taskIndex, this.selectedTask)
  }

  selectTask(task?: 'A' | 'B') {
    this.routerService.routeToTask(this.taskIndex, task);
  }
}
