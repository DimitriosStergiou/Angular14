import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly addEmpURL ='insert';
  private readonly getEmpURL = 'employees';
  private readonly updateEmpUrl = 'updateemp';
  private readonly deleteEmpUrl = 'deleteemp';

  constructor(private http : HttpClient) {}

   addEmployee(emp : Employee): Observable<Employee> {
     return this.http.post<Employee>(this.addEmpURL,emp);
   }

   getAllEmployee(): Observable<Employee[]>{
     return this.http.get<Employee[]>(this.getEmpURL);
   }

   updateEmployee(emp :Employee) : Observable<Employee>{
    return this.http.put<Employee>(this.updateEmpUrl+'/'+emp.EMPLOYEE_ID, emp);
  }

   deleteEmployee(emp : Employee) : Observable<Employee> {
     return this.http.delete<Employee>(this.deleteEmpUrl+'/'+emp.EMPLOYEE_ID);
   }
  

}