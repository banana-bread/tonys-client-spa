import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
    name: 'appCurrency',
    pure: false,
})
export class AppCurrencyPipe implements PipeTransform {

    constructor(private decimanlPipe: DecimalPipe) {}

    transform(value: number): string 
    {
       return `CA $${ this.decimanlPipe.transform(value / 100, '1.0') }`
    }
}