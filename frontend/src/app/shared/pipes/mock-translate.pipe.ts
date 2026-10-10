import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: true
})
export class MockTranslatePipe implements PipeTransform {

  transform(value: string): string {
    return `translated: ${value}`;
  }

}
