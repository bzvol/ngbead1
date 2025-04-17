import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.less',
  standalone: false
})
export class BreadcrumbComponent implements OnInit {
  page?: 'task' | 'summary';
  taskIndex: number = 1;
  selectedTask?: 'A' | 'B';

  constructor(private route: ActivatedRoute) {
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
}
