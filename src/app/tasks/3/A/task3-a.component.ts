import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Name} from "../../../_interfaces/name";

@Component({
    selector: 'app-task3-a',
    templateUrl: './task3-a.component.html',
    styleUrls: ['./task3-a.component.less'],
    standalone: false
})
export class Task3AComponent implements OnInit {
  readonly nameForm;
  name?: Name;

  constructor(private fb: FormBuilder) {
    this.nameForm = this.fb.group({
      title: [''],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]]
    }, {
      updateOn: 'change'
    });
  }

  ngOnInit() {
    this.nameForm.valueChanges.subscribe(value => {
      if (this.nameForm.valid) {
        this.name = this.createNameObject(value);
      }
    })
  }

  createNameObject(nameValue: typeof this.nameForm.value): Name {
    if (!this.nameForm.valid) throw new Error('Form is not valid');

    return {
      title: nameValue.title || undefined,
      firstName: nameValue.firstName!,
      middleName: nameValue.middleName || undefined,
      lastName: nameValue.lastName!
    };
  }

}
