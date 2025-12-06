import { inject, Injectable } from '@angular/core';
import { arrayUnion, collection, doc, Firestore, getDoc, increment, updateDoc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Miss } from '../type/miss';

@Injectable({
    providedIn: 'root',
})
export class MissService {
    readonly #firestore = inject(Firestore);
    readonly #collection = collection(this.#firestore, 'misses');
    readonly #rankingReference = doc(this.#collection, 'ranking');

    findRanking(): Observable<Record<string, number>> {
        return from(getDoc(this.#rankingReference)).pipe(
            map((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();

                    return Object.keys(data).reduce(
                        (acc, key) => ({
                            ...acc,
                            [key]: data[key].votes ?? 0,
                        }),
                        {},
                    );
                }

                return {};
            }),
        );
    }

    vote(id: Miss['id'], votedBy: string): Observable<void> {
        return from(
            updateDoc(this.#rankingReference, {
                [`${id}.votes`]: increment(1),
                [`${id}.votedBy`]: arrayUnion(votedBy),
            }),
        ).pipe(map(() => void 0));
    }
}
