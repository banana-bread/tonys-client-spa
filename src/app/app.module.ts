import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PublicModule } from './public.module';
import { BookingModule } from './views/booking-stepper/booking.module';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { SharedModule } from './shared.module';
import { RedirectGuard } from './services/redirect-guard.service';
import { BaseModel } from './models/base.model';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PublicModule,
    BookingModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    RedirectGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule 
{ 
  constructor(private injector: Injector) 
  {
    BaseModel.api = this.injector.get(ApiService)
  }
}
