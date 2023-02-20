import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth/auth.service';
import { FormGroup, FormBuilder} from '@angular/forms'
import { Employee } from '../model/employee.model';

import { EmployeeService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  empDetail !: FormGroup;
  empList: Employee[] = [];
  display = false;
  DEPARTMENT_ID: any;


  constructor(public authService: AuthService, private router: Router, private formBuilder: FormBuilder, private empService: EmployeeService) {
    
  }

  ngOnInit(): void {
    this.getAllEmployee();

    this.empDetail = this.formBuilder.group({
      EMPLOYEE_ID: [''],
      DEPARTMENT_ID: [''],
      EMPLOYEE_EXT_NUMBER: [''],
      FIRST_NAME: [''],
      LAST_NAME: [''],
      MIDDLE_NAME: [''],
      FULL_NAME: [''],
      JOB_TITLE: [''],
      JOB_LEVEL: [''],
      EMAIL: [''],
      MANAGER_EXT_NUMBER: [''],
      HIRE_DT: [''],
      MANAGER_FLAG: ['']

    });
  }



  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
  addEmployee() {
    const employee = {
      DEPARTMENT_ID : this.empDetail.value.DEPARTMENT_ID,
      EMPLOYEE_EXT_NUMBER : this.empDetail.value.EMPLOYEE_EXT_NUMBER,
      FIRST_NAME : this.empDetail.value.FIRST_NAME,
      LAST_NAME : this.empDetail.value.LAST_NAME,
      MIDDLE_NAME : this.empDetail.value.MIDDLE_NAME,
      FULL_NAME : this.empDetail.value.FULL_NAME,
      JOB_TITLE : this.empDetail.value.JOB_TITLE,
      JOB_LEVEL : this.empDetail.value.JOB_LEVEL,
      EMAIL : this.empDetail.value.EMAIL,
      MANAGER_EXT_NUMBER : this.empDetail.value.MANAGER_EXT_NUMBER,
      HIRE_DT : this.empDetail.value.HIRE_DT,
      MANAGER_FLAG : this.empDetail.value.MANAGER_FLAG
    };
    

    


    this.empService.addEmployee(employee).subscribe(() => {
      this.getAllEmployee();
    });

  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe((res: Employee[]) => {
      this.empList = res;
    });
  }

  Search() {
    if (this.DEPARTMENT_ID == '') {
      this.getAllEmployee()
    } else {
      this.empList = this.empList.filter(res => {
        return res.DEPARTMENT_ID.toLocaleLowerCase().match(this.DEPARTMENT_ID.toLocaleLowerCase());
      })
    }
  }

  editEmployee(emp: Employee) {
    this.empDetail.controls['EMPLOYEE_ID'].setValue(emp.EMPLOYEE_ID);
    this.empDetail.controls['DEPARTMENT_ID'].setValue(emp.DEPARTMENT_ID);
    this.empDetail.controls['EMPLOYEE_EXT_NUMBER'].setValue(emp.EMPLOYEE_EXT_NUMBER);
    this.empDetail.controls['FIRST_NAME'].setValue(emp.FIRST_NAME);
    this.empDetail.controls['LAST_NAME'].setValue(emp.LAST_NAME);
    this.empDetail.controls['MIDDLE_NAME'].setValue(emp.MIDDLE_NAME);
    this.empDetail.controls['FULL_NAME'].setValue(emp.FULL_NAME);
    this.empDetail.controls['JOB_TITLE'].setValue(emp.JOB_TITLE);
    this.empDetail.controls['JOB_LEVEL'].setValue(emp.JOB_LEVEL);
    this.empDetail.controls['EMAIL'].setValue(emp.EMAIL);
    this.empDetail.controls['MANAGER_EXT_NUMBER'].setValue(emp.MANAGER_EXT_NUMBER);
    this.empDetail.controls['HIRE_DT'].setValue(emp.HIRE_DT);
    this.empDetail.controls['MANAGER_FLAG'].setValue(emp.MANAGER_FLAG);

  }

  updateEmployee() {

    const employee = {
      EMPLOYEE_ID : this.empDetail.value.EMPLOYEE_ID,
      DEPARTMENT_ID : this.empDetail.value.DEPARTMENT_ID,
      EMPLOYEE_EXT_NUMBER : this.empDetail.value.EMPLOYEE_EXT_NUMBER,
      FIRST_NAME : this.empDetail.value.FIRST_NAME,
      LAST_NAME : this.empDetail.value.LAST_NAME,
      MIDDLE_NAME : this.empDetail.value.MIDDLE_NAME,
      FULL_NAME : this.empDetail.value.FULL_NAME,
      JOB_TITLE : this.empDetail.value.JOB_TITLE,
      JOB_LEVEL : this.empDetail.value.JOB_LEVEL,
      EMAIL : this.empDetail.value.EMAIL,
      MANAGER_EXT_NUMBER : this.empDetail.value.MANAGER_EXT_NUMBER,
      HIRE_DT : this.empDetail.value.HIRE_DT,
      MANAGER_FLAG : this.empDetail.value.MANAGER_FLAG
    };

    

    this.empService.updateEmployee(employee).subscribe(() => {
      this.getAllEmployee();
    })

  }

  deleteEmployee(emp: Employee) {

    this.empService.deleteEmployee(emp).subscribe(() => {
      alert('Employee deleted successfully');
      this.getAllEmployee();
    });

  }

}
