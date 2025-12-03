import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@angular/fire/auth';
import { finalize, tap } from 'rxjs';
import { AuthService } from '../service/auth-service';

@Injectable({
    providedIn: 'root',
})
export class AuthStore {
    readonly #service = inject(AuthService);

    readonly #loading = signal(false);
    readonly loading = this.#loading.asReadonly();

    readonly #user = signal<User | null>(null);
    readonly user = this.#user.asReadonly();
    readonly logged = computed(() => !!this.user());

    init() {
        return this.#service.getCurrentUser().pipe(
            tap((user) => {
                this.#user.set(user);
            }),
        );
    }

    signIn(pseudo: string) {
        this.#loading.set(true);

        this.#service
            .signIn(pseudo)
            .pipe(finalize(() => this.#loading.set(false)))
            .subscribe((user) => this.#user.set(user));
    }
}
