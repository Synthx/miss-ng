import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable, of, switchMap, timer } from 'rxjs';
import { StorageService } from '../../../service/storage-service';
import { AuthStore } from '../../auth/store/auth-store';
import { MISSES } from '../data/misses';
import { MissService } from '../service/miss-service';
import { Miss } from '../type/miss';

const VOTES_STORAGE_KEY = 'votes';

@Injectable({
    providedIn: 'root',
})
export class MissStore {
    readonly #missService = inject(MissService);
    readonly #authStore = inject(AuthStore);
    readonly #storageService = inject(StorageService);

    readonly #loading = signal(false);
    readonly loading = this.#loading.asReadonly();

    readonly #misses = signal<Miss[]>(MISSES);
    readonly misses = this.#misses.asReadonly();

    readonly #votes = signal<Record<string, boolean>>(this.#loadInitialVotes());
    readonly votes = this.#votes.asReadonly();
    readonly votedMissIds = computed(() => {
        return Object.keys(this.votes());
    });

    constructor() {
        timer(0, 10 * 60 * 1000)
            .pipe(
                switchMap(() => this.#missService.findRanking()),
                takeUntilDestroyed(),
            )
            .subscribe((ranking) => {
                this.#misses.update((misses) => misses.map((m) => ({ ...m, votes: ranking[m.id] ?? 0 })));
            });
    }

    vote(id: Miss['id'], value: boolean) {
        const votedBy = this.#authStore.user()?.displayName;
        if (!votedBy) {
            throw new Error('Cannot vote if not logged in');
        }

        let action$: Observable<unknown> = of(void 0);
        if (value) {
            action$ = this.#missService.vote(id, votedBy);
        }

        this.#loading.set(true);
        action$.pipe(finalize(() => this.#loading.set(false))).subscribe(() => {
            this.#votes.update((votes) => ({
                ...votes,
                [id]: value,
            }));

            this.#storageService.set(VOTES_STORAGE_KEY, this.votes());
        });
    }

    #loadInitialVotes(): Record<string, boolean> {
        const votes = this.#storageService.get<Record<string, boolean>>(VOTES_STORAGE_KEY);
        if (!votes) {
            return {};
        }

        return votes;
    }
}
