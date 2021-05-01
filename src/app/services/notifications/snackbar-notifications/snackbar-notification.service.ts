import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { SnackbarNotificationData } from "./snackbar-notification-data.interface";
import { SnackbarNotificationComponent } from './snackbar-notification.component';

@Injectable({
    providedIn: 'root'
})
export class SnackbarNotificationService {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center'; 
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private snackBar: MatSnackBar) { }

    success(message = 'Success')
    {
        this.showSnackbar({
            message,
            icon: 'check_circle',
            background: 'snackbar-success'
        });
    }

    warning(message = 'Warning')
    {
        this.showSnackbar({
            message,
            icon: 'report_problem',
            background: 'snackbar-warning',
        });
    }

    error(message = 'Failure')
    {
        this.showSnackbar({
            message,
            icon: 'error_outline',
            background: 'snackbar-error',
        });
    }

    private showSnackbar(data: SnackbarNotificationData): void
    {
        this.snackBar.openFromComponent(SnackbarNotificationComponent, {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: [data.background],
            data
        })
    }
}
