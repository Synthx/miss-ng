import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthStore } from './domain/auth/store/auth-store';
import Register from './page/register/register';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Register],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App implements OnInit {
    readonly #authStore = inject(AuthStore);

    protected readonly loading = signal(true);
    protected readonly logged = this.#authStore.logged;

    ngOnInit(): void {
        this.loading.set(true);

        forkJoin([this.#authStore.init()]).subscribe(() => {
            this.loading.set(false);
        });
    }
}
