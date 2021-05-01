import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginStateService {
    loadingChange: Subject<boolean> = new Subject<boolean>();

    loadingChanged(isLoading: boolean)
    {
        this.loadingChange.next(isLoading);
    }
}