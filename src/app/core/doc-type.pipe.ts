import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'docType'
})
export class DocTypePipe implements PipeTransform {

  docType = [
    'Cedula de Ciudadania',
    'Cedula de extrangeria',
    'Pasaporte',
    'Otro'
  ];

  transform(value: any, args?: any): any {
    return this.docType[value];
  }

}
