import {Pipe, PipeTransform} from '@angular/core';
import {Name} from "../_interfaces/name";

@Pipe({
  name: 'composeName'
})
export class ComposeNamePipe implements PipeTransform {

  transform(value: Name, lang: 'hu' | 'en' = 'hu'): string {
    return (lang === 'hu'
      ? [value.title, value.lastName, value.middleName, value.firstName]
      : [value.title, value.firstName, value.middleName, value.lastName])
      .filter(Boolean)
      .join(' ');
  }

}
