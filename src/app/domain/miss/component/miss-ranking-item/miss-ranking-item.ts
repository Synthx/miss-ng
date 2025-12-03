import { Component, computed, input, numberAttribute } from '@angular/core';
import { AwardIcon } from '../../../../component/icon/award-icon';
import { ChessQueenIcon } from '../../../../component/icon/chess-queen-icon';
import { Icon } from '../../../../component/icon/icon';
import { MedalIcon } from '../../../../component/icon/medal-icon';
import { Miss } from '../../type/miss';
import { MissPicture } from '../miss-picture';

@Component({
    selector: 'app-miss-ranking-item',
    imports: [MissPicture, Icon, ChessQueenIcon, MedalIcon, AwardIcon],
    templateUrl: './miss-ranking-item.html',
    styleUrl: './miss-ranking-item.scss',
})
export class MissRankingItem {
    readonly miss = input.required<Miss>();
    readonly index = input.required({ transform: numberAttribute });

    readonly classes = computed(() => {
        switch (this.index()) {
            case 0:
                return 'bg-gradient-to-r from-accent/20 to-gold-light/20 border-accent/30';
            case 1:
                return 'bg-gradient-to-r from-secondary/50 to-gold-light/20 border-muted-foreground/20';
            case 2:
                return 'bg-gradient-to-r from-rose-gold-light/20 to-gold-light/20 border-rose-gold/30';
            default:
                return undefined;
        }
    });
}
