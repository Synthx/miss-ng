import { Component, computed, inject } from '@angular/core';
import { CrownIcon } from '../../../component/icon/crown-icon';
import { Icon } from '../../../component/icon/icon';
import { TrophyIcon } from '../../../component/icon/trophy-icon';
import { Tab, TABS } from '../../../domain/miss/type/tab';
import { HomeStore } from '../home.store';

@Component({
    selector: 'app-home-header',
    imports: [Icon, CrownIcon, TrophyIcon],
    templateUrl: './home-header.html',
    styleUrl: './home-header.scss',
})
export class HomeHeader {
    readonly #homeStore = inject(HomeStore);

    protected readonly tabs = computed(() => {
        return TABS.map((t) => ({ key: t, active: t === this.#homeStore.activeTab() }));
    });

    selectTab(tab: Tab) {
        this.#homeStore.selectTab(tab);
    }
}
