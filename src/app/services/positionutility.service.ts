import { findIndex } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserutilityService {

  constructor(private http:HttpClient) { }

  fetchUsers()
  {
    return this.http.get('http://localhost:3000/employees/');
  }

  addUser(userData:any)
  {
    return this.http.post('http://localhost:3000/employees/',userData);
  }

  deleteUser(id:number)
  {
    return this.http.delete('http://localhost:3000/employees/'+id);
  }
  updateUser(payload:any,id:number)
  {
    return this.http.patch('http://localhost:3000/employees/'+ id,payload);
  }
}
