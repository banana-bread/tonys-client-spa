import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { SnackbarNotificationService } from '@tonys-barbers/shared';
import { AppStateService } from './services/app-state.service';
import { ContactDialogService } from './contact-dialog/contact-dialog.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'tonys-webapp';

  //  TODO: this doens't work
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private notifications: SnackbarNotificationService,
    public auth: AuthService,
    public contactDialog: ContactDialogService,
    public appState: AppStateService,
    ) 
  {
    this.matIconRegistry.addSvgIcon('google',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/google_icon.svg'));
    this.matIconRegistry.addSvgIcon('facebook',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/facebook_icon.svg'));
  }

  onLogout() 
  {
    this.auth.logout();
    this.appState.setLoggedIn(false);
    this.notifications.success('Signed out')
  }
}
