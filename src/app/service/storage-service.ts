import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    readonly #storage = localStorage;

    get<T>(key: string): T | undefined {
        try {
            const raw = this.#storage.getItem(key);
            if (!raw) {
                return undefined;
            }

            return JSON.parse(raw) as T;
        } catch {
            return undefined;
        }
    }

    set<T>(key: string, value: T): void {
        this.#storage.setItem(key, JSON.stringify(value));
    }
}
