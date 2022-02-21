import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Client } from "../models/client/client.model";

// TODO: we could create a stateobject interface, have classes
//      implement it, register them in here... maybe
@Injectable({
    providedIn: 'root'
})
export class AppStateService 
{
    private readonly _loading = new BehaviorSubject<boolean>(false)
    private readonly _loggedIn = new BehaviorSubject<boolean>(false);
    private readonly _authedClient = new BehaviorSubject<Client>(new Client());

    readonly authedClient$ = this._authedClient.asObservable();

    get isLoading(): boolean
    {
        return this._loading.getValue();
    }

    get isLoggedIn(): boolean
    {
        return this._loggedIn.getValue();
    }

    get authedClient(): Client
    {
        return this._authedClient.getValue();
    }
    
    setLoading(loading: boolean)
    {
        this.loading = loading;
    }

    setLoggedIn(loggedIn: boolean): void
    {
        this.loggedIn = loggedIn;
    }

    setAuthedClient(client: Client)
    {
        this.authedClient = client;
    }

    set loading(val: boolean)
    {
        this._loading.next(val);
    }

    set loggedIn(val: boolean)
    {
        this._loggedIn.next(val);
    }

    set authedClient(val: Client)
    {
        this._authedClient.next(val);
    }
}
