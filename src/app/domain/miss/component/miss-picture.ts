import { Directive, input } from '@angular/core';
import { Miss } from '../type/miss';

@Directive({
    selector: 'img[app-miss-picture]',
    host: {
        '[alt]': 'miss().name',
        '[src]': '`/images/card/${miss().id}.webp`',
    },
})
export class MissPicture {
    readonly miss = input.required<Miss>();
}
