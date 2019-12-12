import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users-delete-dialog',
  templateUrl: './users-delete-dialog.component.html',
  styleUrls: ['./users-delete-dialog.component.scss']
})
export class UsersDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UsersDeleteDialogComponent>,
  ) { }

  confirm(): void {
    this.dialogRef.close(true);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
