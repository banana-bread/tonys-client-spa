import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppStateService {

    private readonly _loading = new BehaviorSubject<boolean>(false)
    private readonly _loggedIn = new BehaviorSubject<boolean>(false);

    get loading(): boolean
    {
        return this._loading.getValue();
    }

    set loading(val: boolean)
    {
        this._loading.next(val);
    }

    setLoading(loading: boolean)
    {
        this.loading = loading;
    }

    get loggedIn(): boolean
    {
        return this._loggedIn.getValue();
    }

    set loggedIn(val: boolean)
    {
        this._loggedIn.next(val);
    }

    setLoggedIn(loggedIn: boolean): void
    {
        this.loggedIn = loggedIn;
    }
}