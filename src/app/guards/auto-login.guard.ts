import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard {

  constructor(private authService: AuthenticationService, private router: Router) { }

  /*  Este método se ejecuta para determinar si una ruta específica puede ser accedida.
      filter(val => val !== null) filtra cualquier valor nulo del Observable, si el estado de
      autenticación aún no está definido (es decir, es null), este valor será ignorado*/
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          // console.log("Autologin funcionando");
          return this.router.parseUrl('/app');
        } else {
          return true;
        }
      })
    );
  }

}
