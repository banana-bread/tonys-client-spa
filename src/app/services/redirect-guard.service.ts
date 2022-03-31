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
        const companyId = route.paramMap.get('companyId');
        const domain = this.router['location']._platformLocation.location.origin;

        console.log('companyId')
        console.log(companyId)
        if (companySlug !== 'tonys' || 
            companyId !== '4e25c4a0-5552-11ec-8f92-03a15ba00997') 
        { 
            return true; 
        }
        
        if (domain === 'https://simplebarber.ca') 
        {
            window.location.href = 'https://book.simplebarber.ca/tonys'
        }

        return true;
    }
}
