import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'feetInches',
})
export class FeetInchesPipe implements PipeTransform {
    transform(size: string) {
        // If size is falsy, return null
        if (!size) return null;
        // Extract length, width and height from size
        const len: number = + size.split('x', 1)[0];
        const width: number = + size.split('x', 2)[1];
        const height: number = + size.split('x', 3)[2];

        return this.feetInches(len) + ' x ' + this.feetInches(width) + ' x ' +
            this.feetInches(height);
    }

    feetInches(dim) {
        // Get the integer part of the float
        let ft = Math.floor(dim);
        // Convert the decimal part to inches
        let inches = Math.ceil((dim - ft) * 12);
        inches === 12 ? () => { ft++; inches = 0; } : '';
        // If inches is 0, omit specifying inches
        if (inches === 0) {
            return ft + `'`;
        } else {
            return ft + `'` + inches + '"';
        }
    }
}
