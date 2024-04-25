import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoTasa'
})
export class FormatoTasaPipe implements PipeTransform {

  transform(value: number): unknown {
    return (value*100).toString+"%";
  }

}
