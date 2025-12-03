import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Field, form, maxLength, required } from '@angular/forms/signals';
import { AuthStore } from '../../domain/auth/store/auth-store';

@Component({
    selector: 'app-register',
    imports: [Field, FormsModule],
    templateUrl: './register.html',
    styleUrl: './register.scss',
})
export default class Register {
    readonly #authStore = inject(AuthStore);
    readonly #registerFormModel = signal<{
        pseudo: string;
    }>({
        pseudo: '',
    });

    protected readonly registerForm = form(this.#registerFormModel, (path) => {
        required(path.pseudo, { message: 'Le pseudo est requis' });
        maxLength(path.pseudo, 30, { message: '' });
    });

    register() {
        if (this.registerForm.pseudo().invalid()) {
            return;
        }

        const { pseudo } = this.#registerFormModel();
        this.#authStore.signIn(pseudo);
    }
}
