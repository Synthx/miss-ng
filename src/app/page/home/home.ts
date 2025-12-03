import { Component, inject } from '@angular/core';
import { HomeHeader } from './home-header/home-header';
import { HomeRankingTab } from './home-ranking-tab/home-ranking-tab';
import { HomeVoteTab } from './home-vote-tab/home-vote-tab';
import { HomeStore } from './home.store';

@Component({
    selector: 'app-home',
    imports: [HomeHeader, HomeVoteTab, HomeRankingTab],
    templateUrl: './home.html',
    styleUrl: './home.scss',
    providers: [HomeStore],
})
export default class Home {
    readonly #store = inject(HomeStore);

    protected readonly activeTab = this.#store.activeTab;
}
