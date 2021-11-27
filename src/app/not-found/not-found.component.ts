import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div>
        <h1>404</h1>
        <h3>Page not found</h3>
    </div>
  `,
  styles: [
      `h1 { 
            font-size: 70px; 
            margin-top: 100px;
       }
       h1, h3 {
            text-align: center;
       }
        `
    ],

})
export class NotFoundComponent implements OnInit {
    ngOnInit(): void {}
}