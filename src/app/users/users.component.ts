import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from './users.service';
import { Scroll, User } from './users';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { finalize } from 'rxjs/operators';
import { UsersDeleteDialogComponent } from './users-delete-dialog/users-delete-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'city', 'delete'];
  dataSource: MatTableDataSource<User>;
  scroll: Scroll = new Scroll();
  users: User[] = [];
  listPreloader: boolean = true;

  constructor(
    private globalService: GlobalService,
    private usersService: UsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(): void {
    this.listPreloader = true;
    this.usersService.getUsers(this.scroll.skip, this.scroll.limit).pipe(
      finalize(() => this.listPreloader = false)
    ).subscribe(
      res => {
        this.users = [...this.users, ...res];
        this.dataSource = new MatTableDataSource(this.users);
      },
      err => console.log(err)
    );
  }

  showDeleteButton(user: User): boolean {
    return (user.admin) ? !(this.globalService.actualUser.email === user.email) : true;
  }

  addUser(user: User) {
    this.usersService.addUser(user).subscribe(
      res => {
        this.dataSource = new MatTableDataSource([res, ...this.users]);
      },
      err => console.log(err)
    );
  }

  editUser(user: User) {
    this.usersService.editUser(user).subscribe(
      res => {
        this.users.forEach(usr => {
          if (usr.id === res.id) {
            Object.assign(usr, res);
          }
        });
        this.dataSource = new MatTableDataSource(this.users);
      },
      err => console.log(err)
    );
  }

  openDialog(user?: User): void {
    this.dialog.open(UsersDialogComponent, { width: '350px', data: user }).afterClosed().subscribe(result => {
      if (result) {
        user ? this.editUser(result) : this.addUser(result);
      }
    });
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user.id).subscribe(
      () => {
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === user.id) {
            this.users.splice(i, 1);
            break;
          }
        }
        this.dataSource = new MatTableDataSource(this.users);
      },
      err => console.log(err),
    );
  }

  deleteDialog(user: User): void {
    this.dialog.open(UsersDeleteDialogComponent, { width: '350px' }).afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }

  onScroll(): void {
    this.scroll.skip += 20;
    this.getUsersList();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
