import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AllEmiterService {
    invoketTitleChange = new EventEmitter();
    subsTitleChange: Subscription;
    constructor() { }

    onNewTitle(title: string) {
        this.invoketTitleChange.emit(title);
    }
}
