import { Component, computed, inject } from '@angular/core';
import { HeartIcon } from '../../../component/icon/heart-icon';
import { Icon } from '../../../component/icon/icon';
import { XIcon } from '../../../component/icon/x-icon';
import { Spinner } from '../../../component/spinner/spinner';
import { MissVoteCard } from '../../../domain/miss/component/miss-vote-card/miss-vote-card';
import { MissStore } from '../../../domain/miss/store/miss-store';
import { Miss } from '../../../domain/miss/type/miss';

@Component({
    selector: 'app-home-vote-tab',
    imports: [MissVoteCard, Icon, XIcon, HeartIcon, Spinner],
    templateUrl: './home-vote-tab.html',
    styleUrl: './home-vote-tab.scss',
})
export class HomeVoteTab {
    readonly #missStore = inject(MissStore);
    readonly #votedMissIds = this.#missStore.votedMissIds;

    protected readonly loading = this.#missStore.loading;
    protected readonly current = computed(() => {
        return this.#votedMissIds().length;
    });
    protected readonly total = computed(() => {
        return this.#missStore.misses().length;
    });
    protected readonly progression = computed(() => {
        if (this.total() == 0) {
            return 0;
        }

        return (this.current() / this.total()) * 100;
    });
    protected readonly remainingMisses = computed(() => {
        return this.#missStore
            .misses()
            .filter(({ id }) => !this.#votedMissIds().includes(id))
            .slice(0, 3)
            .toReversed();
    });
    protected readonly currentMissId = computed(() => {
        const misses = this.remainingMisses();

        return misses[misses.length - 1]?.id;
    });

    vote(id: Miss['id'], value: boolean) {
        this.#missStore.vote(id, value);
    }
}
