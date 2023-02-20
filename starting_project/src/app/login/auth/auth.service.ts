import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  
  

  login(email:string , pswd:string): Observable<boolean> {
    if (email === 'dimitrios.stergiou@atos.net' &&  pswd === '123456'){
    return of(true).pipe(
      delay(1000),
      tap(() => this.isLoggedIn = true)
    );}
    else {
      return of(false).pipe(
        delay(1000),
        tap(() => this.isLoggedIn = false)
      );
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    
  }

 
}
