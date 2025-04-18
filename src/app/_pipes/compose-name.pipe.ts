import {Pipe, PipeTransform} from '@angular/core';
import {Name} from "../_interfaces/name";

@Pipe({
  name: 'composeName'
})
export class ComposeNamePipe implements PipeTransform {

  transform(value: Name): string {
    return [value.title, value.lastName, value.middleName, value.firstName]
      .filter(Boolean)
      .join(' ');
  }

}
