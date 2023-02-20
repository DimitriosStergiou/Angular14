import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup ,UntypedFormControl,UntypedFormGroup,Validators} from '@angular/forms'
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email!:any;
  pwd!:any;
  
  ngOnInit(): void {
    
  }
  form = new UntypedFormGroup({
    
    pwd: new UntypedFormControl("123456",[
    Validators.required,
  Validators.minLength(6)]),
    email: new UntypedFormControl("dimitrios.stergiou@atos.net",[
      Validators.required,
      Validators.email])
  });

  constructor(private authService: AuthService, private router: Router) { }

  submitted =false;

  
  submit(form: UntypedFormGroup) {
    console.log(form.value);
    this.submitted =true;
    if(this.form.invalid){
      return;
    }
    else {
      const email=this.form.get('email')?.value;
      const pwd =this.form.get('pwd')?.value;

      this.authService.login(email,pwd).subscribe(isLoggedin =>{
        if (isLoggedin) {
          this.router.navigateByUrl('users');
        }
        else {
          alert("Please try again...")
        }
      })
    } 
     
    }

    
  
    
}

