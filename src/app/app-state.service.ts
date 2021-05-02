import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppStateService {
    loading: Subject<boolean> = new Subject<boolean>()

    setLoading(isLoading: boolean): void
    {
        this.loading.next(isLoading);
    }
}