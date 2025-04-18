import {Pipe, PipeTransform} from '@angular/core';
import {Name} from "../_interfaces/name";

@Pipe({
  name: 'composeName'
})
export class ComposeNamePipe implements PipeTransform {

  transform(value: Name, lang: 'hu' | 'en' = 'hu'): string {
    if (value.firstName.length < 3 || value.lastName.length < 3) {
      return 'Nem megfelelő név!';
    }

    return (lang === 'hu'
      ? [value.title, value.lastName, value.middleName, value.firstName]
      : [value.title, value.firstName, value.middleName, value.lastName])
      .filter(Boolean)
      .join(' ');
  }

}
