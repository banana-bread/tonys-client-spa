import { Component, Inject, Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

interface ConfirmDialogData {
    title?: string,
    message: string;
    okLabel?: string;
    cancelLabel?: string;
}
@Component({
    selector: 'app-confirm-dialog',
    template: `
        <h1 mat-dialog-title>{{ title }}</h1>
        <div mat-dialog-content>{{ message }}</div>
        <div mat-dialog-actions align="end">
            <button mat-dialog-close mat-flat-button>{{ cancelLabel }}</button>
            <button (click)="onConfirm()" mat-flat-button color="accent">{{ okLabel }}</button>
        </div>`
})
export class ConfirmDialogComponent {
    title = this.data.title || 'Confirm';
    message = this.data.message;
    okLabel = this.data.okLabel || 'Confirm';
    cancelLabel = this.data.cancelLabel || 'Cancel';

    constructor(
     @Inject(MAT_DIALOG_DATA) private data: ConfirmDialogData,
     public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    ) {}

    onConfirm() 
    {
        return this.dialogRef.close(true);
    }
}

@Injectable({ 
    providedIn: 'root' 
})
export class ConfirmDialogService {
    constructor(private dialog: MatDialog) {}

    async open(data: ConfirmDialogData): Promise<boolean>
    {
        const dialogConfig: MatDialogConfig = {
            disableClose: true,
            hasBackdrop: true,
            autoFocus: false,
            data,
        }

        return this.dialog.open(ConfirmDialogComponent, dialogConfig)
            .afterClosed()
            .toPromise();
    }
  
}
