import { inject, Injectable } from '@angular/core';
import { Auth, authState, signInAnonymously, signOut, updateProfile, User } from '@angular/fire/auth';
import { first, from, map, Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    readonly #auth = inject(Auth);

    getCurrentUser() {
        return authState(this.#auth).pipe(first());
    }

    signIn(pseudo: string): Observable<User> {
        return from(signInAnonymously(this.#auth)).pipe(
            map((credential) => credential.user),
            switchMap((user) => {
                return from(updateProfile(user, { displayName: pseudo })).pipe(map(() => user));
            }),
        );
    }

    logout(): Observable<void> {
        return from(signOut(this.#auth));
    }
}
