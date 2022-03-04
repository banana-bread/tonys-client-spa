import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-dialog',
  template: `
    <h1 mat-dialog-title>Contact</h1>   
    <div mat-dialog-content>For any issues or inquires, please contact {{ email }}</div>
        <div mat-dialog-actions align="end">
        <button mat-flat-button color="accent" mat-dialog-close>Ok</button>
    </div>
  `
})
export class ContactDialogComponent implements OnInit {
    ngOnInit(): void {}

    email = 'simplebarberapp@gmail.com'
}

@Injectable({
    providedIn: 'root'
})
export class ContactDialogService {
    constructor(protected dialog: MatDialog) {}

    async open(data?: any): Promise<boolean> 
    {
        const dialogConfig: MatDialogConfig = {
            disableClose: true,
            hasBackdrop: true,
            autoFocus: false,
            data
          }

        return this.dialog.open(ContactDialogComponent, dialogConfig)
            .afterClosed()
            .toPromise();
    }   
}
