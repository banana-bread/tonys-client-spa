import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

    constructor(private router: Router) {}

    // TODO: this whole thing is a massive hack job that should be removed in a few months.
    // if Digital Ocean app platform offered 301 redirects, this wouldn't need to be implemented
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
    {
        const companySlug = route.paramMap.get('companySlug');
        const domain = this.router['location']._platformLocation.location.origin;

        if (companySlug !== 'tonys') { return true; }

        
        if (domain === 'https://stage.simplebarber.ca') 
        {
            window.location.href = 'https://stage.book.simplebarber.ca/tonys'
        }

        return true;
    }
}
