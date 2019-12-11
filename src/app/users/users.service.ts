import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'api/users';

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(skip: number, limit: number): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + `?_start=${skip}&_limit=${limit}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.patch<User>(this.usersUrl + `/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.usersUrl + `/${id}`);
  }
}
