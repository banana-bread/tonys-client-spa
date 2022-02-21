import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppStateService {

    private readonly _loading = new BehaviorSubject<boolean>(false)
    private readonly _loggedIn = new BehaviorSubject<boolean>(false);

    get isLoading(): boolean
    {
        return this._loading.getValue();
    }
    
    setLoading(loading: boolean)
    {
        this.loading = loading;
    }

    set loading(val: boolean)
    {
        this._loading.next(val);
    }

    get isLoggedIn(): boolean
    {
        return this._loggedIn.getValue();
    }

    setLoggedIn(loggedIn: boolean): void
    {
        this.loggedIn = loggedIn;
    }

    set loggedIn(val: boolean)
    {
        this._loggedIn.next(val);
    }

}
