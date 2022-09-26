import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { SnackbarNotificationService } from '@tonys-barbers/shared';
import { AppStateService } from './services/app-state.service';
import { ContactDialogService } from './components/contact-dialog/contact-dialog.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Client } from './models/client.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'tonys-webapp';

  //  TODO: this doens't work
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private notifications: SnackbarNotificationService,
    private auth: AuthService,
    private router: Router,
    public contactDialog: ContactDialogService,
    public appState: AppStateService,
    ) 
  {
    this.matIconRegistry.addSvgIcon('google',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/google_icon.svg'));
    this.matIconRegistry.addSvgIcon('facebook',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/facebook_icon.svg'));
  }

  async ngOnInit(): Promise<void> 
  {
    this.appState.setLoggedIn(this.auth.isLoggedIn());

    if (!this.appState.isLoggedIn) return
    
    const authedClient = await Client.authed();
    this.appState.setAuthedClient(authedClient);
    
  }

  onLogout() 
  {
    this.auth.logout();
    this.appState.setLoggedIn(false);
    this.notifications.success('Signed out')
    this.router.navigate(['login']);
  }

  onBookNow()
  {
    this.router.navigate(['tonys'])
  }
}
