import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/global.service';
import { TranslatePos, Translations } from './users-dialog';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent implements OnInit {
  userForm: FormGroup;
  dialogUser: User = new User();
  actualUser: User = this.globalService.actualUser;
  letAdmin: boolean = true;
  generatePassword: boolean = true;
  translations: Translations = {
    edit: new TranslatePos('Edit user', 'Edit'),
    add: new TranslatePos('Add user', 'Add')
  };
  tranPos: TranslatePos = new TranslatePos();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsersDialogComponent>,
    private globalService: GlobalService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit() {
    if (this.data) {
      this.generatePassword = false;
      this.dialogUser = this.data;
      if (this.data.email === this.globalService.actualUser.email) { // admin cannot delete his own permission
        this.letAdmin = false;
      }
    }
    this.buildForm();
    this.translateText();
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      name: [this.dialogUser.name, Validators.required],
      surname: [this.dialogUser.surname, Validators.required],
      city: [this.dialogUser.city, Validators.required],
      country: [this.dialogUser.country, Validators.required],
      email: [this.dialogUser.email, [Validators.required, Validators.email]],
      password: [
        this.dialogUser.password,
        this.generatePassword ? null : [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[0-9]).{8,}')]
      ],
      admin: [this.dialogUser.admin],
      id: [this.dialogUser.id]
    });
  }

  submitDialog(): void {
    this.dialogRef.close(this.userForm.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  translateText(): void {
    (this.data) ? this.tranPos = this.translations.edit : this.tranPos = this.translations.add;
  }

  togglePassword(): void {
    this.generatePassword = !this.generatePassword;
    if (this.generatePassword) {
      this.clearUserFormField('password');
      this.userForm.controls['password'].setValidators(null);
    } else {
      this.clearUserFormField('password');
      this.userForm.controls['password'].setValidators([Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[0-9]).{8,}')]);
    }
  }

  clearUserFormField(field: string): void {
    this.userForm.controls[field].clearValidators();
    this.userForm.controls[field].setValue('');
  }
}
