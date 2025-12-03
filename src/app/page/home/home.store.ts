import { Injectable, signal } from '@angular/core';
import { Tab } from '../../domain/miss/type/tab';

@Injectable()
export class HomeStore {
    readonly #activeTab = signal<Tab>('vote');
    readonly activeTab = this.#activeTab.asReadonly();

    selectTab(tab: Tab) {
        this.#activeTab.set(tab);
    }
}
