import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent  {

  employees: any;
  positions: any;

  constructor( private http:HttpClient) { }



}
