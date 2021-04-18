import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'appDuration',
    pure: false,
})
export class AppDurationPipe implements PipeTransform {

    transform(value: number): string 
    {
       return `${ value / 60 }min`
    }
}