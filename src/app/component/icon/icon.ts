import { Directive } from '@angular/core';

@Directive({
    selector: 'svg[app-icon]',
    host: {
        class: 'icon',
        fill: 'none',
        viewBox: '0 0 24 24',
        xmlns: 'http://www.w3.org/2000/svg',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        '[attr.aria-hidden]': 'true',
    },
})
export class Icon {}
