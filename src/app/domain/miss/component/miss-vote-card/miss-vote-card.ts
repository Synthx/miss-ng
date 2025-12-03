import { Component, input } from '@angular/core';
import { Icon } from '../../../../component/icon/icon';
import { MapPinIcon } from '../../../../component/icon/map-pin-icon';
import { Miss } from '../../type/miss';
import { MissPicture } from '../miss-picture';

@Component({
    selector: 'app-miss-vote-card',
    imports: [MapPinIcon, Icon, MissPicture],
    templateUrl: './miss-vote-card.html',
    styleUrl: './miss-vote-card.scss',
})
export class MissVoteCard {
    readonly miss = input.required<Miss>();
}
