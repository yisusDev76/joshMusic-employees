import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService:AuthenticationService,
    private router:Router
    ){}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated.pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.parseUrl('/login');
        }
      })
    );
  }
}
