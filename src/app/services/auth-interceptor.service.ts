import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService) { } 

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (! this.jwtService.hasToken())
    {
      return next.handle(req)
    }

    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.jwtService.getToken()}`)
    })

    return next.handle(cloned)
  }
}
