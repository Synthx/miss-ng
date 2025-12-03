import { Component, computed, inject } from '@angular/core';
import { Icon } from '../../../component/icon/icon';
import { SparklesIcon } from '../../../component/icon/sparkles-icon';
import { MissRankingItem } from '../../../domain/miss/component/miss-ranking-item/miss-ranking-item';
import { MissStore } from '../../../domain/miss/store/miss-store';

@Component({
    selector: 'app-home-ranking-tab',
    imports: [MissRankingItem, Icon, SparklesIcon],
    templateUrl: './home-ranking-tab.html',
    styleUrl: './home-ranking-tab.scss',
})
export class HomeRankingTab {
    readonly #missStore = inject(MissStore);

    protected readonly misses = computed(() => {
        return this.#missStore.misses().toSorted((a, b) => b.votes - a.votes);
    });
}
