import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../network/api.service';
import { JwtService } from '../jwt/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService,
    private jwt: JwtService,
  ) { }

  async loginWithEmail(username: string, password: string): Promise<void> 
  {
    const response = await this.api.loginWithEmail({username, password});
    this.jwt.setToken(response.data);
  }

  async loginWithProvider(provider: string): Promise<void>
  {
    const response = await this.api.loginWithProvider(provider);

    window.open(response.data.auth_url)
  
    // var popWindow = window.open('https://accounts.google.com/AddSession#identifier', '', 'width=721, height=589'); setInterval(function () {if (popWindow.location.href != 'https://accounts.google.com/AddSession#identifier') { popWindow.close(); }}, 1);"
    // const authWindow = window.open(response.data.auth_url + "#mybumbum", "mywindow","menubar=1,resizable=1,width=500,height=700");

    // authWindow.addEventListener('hashchange', function() {
    //   console.log('Fuck my dick!')
    // }, false);
    // setInterval(() => {
    //   // if (authWindow.location.hash == '#mybumbum')
    //   // {
    //     console.log(authWindow.location)
    //   // }
    // }, 1000);
    // const doc = authWindow.document;
    // console.log(doc)
    // doc.write(`
    // <html><head>
    // <script type='text/javascript'>
    // console.log('fuck my ass hole')
    // </script>
    // </head><body>
    // </body></html>
    // `)
    // authWindow.addEventListener('load', (event) => {
      // authWindow.postMessage('fuck', '*');
      // authWindow.addEventListener("message", () => { 
      //  console.log('fuuuuuck')
      // }, false);

  }

  async registerWithEmail(name: string, email: string, password: string): Promise<any> 
  {
    const response = await this.api.registerWithEmail({name, email, password});
    return response;
  }

  isLoggedIn(): boolean
  {
    return this.jwt.hasToken() && this.jwt.hasValidToken();
  }
}
