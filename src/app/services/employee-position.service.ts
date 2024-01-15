import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeePosition } from '../models/employee-position.model';

const API_URL = 'http://localhost:3000/employeePositions';

@Injectable({
  providedIn: 'root'
})
export class EmployeePositionService {
  constructor(private http: HttpClient) {}

  getAllPositions(): Observable<EmployeePosition[]> {
    return this.http.get<EmployeePosition[]>(API_URL);
  }

  getPositionById(id: number): Observable<EmployeePosition> {
    return this.http.get<EmployeePosition>(`${API_URL}/${id}`);
  }

  updatePosition(position: EmployeePosition): Observable<EmployeePosition> {
    return this.http.put<EmployeePosition>(`${API_URL}/${position.id}`, position);
  }

  deletePosition(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
