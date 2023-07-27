import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root'
})
class IntroGuardService {
  constructor(private router: Router) {}

  // Implementa el método canActivate(). Esta es la lógica real de tu guard.
  async canActivate(): Promise<boolean> {
    // Verifica si el usuario ha visto la introducción.
    const hasSeenIntro = await Preferences.get({key:INTRO_KEY})

    // Si el usuario ha visto la introducción, permite la activación de la ruta.
    if (hasSeenIntro && (hasSeenIntro.value === 'true')) {
      return true;
    } else {
      // Si no, redirige al usuario a la página de introducción y permite la activación de la ruta.
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return true;
    }
  }
}

// Declara la función que se usará como guard.
// Esta función será llamada por Angular cuando intente navegar a una ruta que esté protegida por este guard.
export const IntroGuard: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean> | Promise<boolean> | boolean =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // Inyecta una instancia de IntroGuardService.
  const guardService = inject(IntroGuardService);
  // Llama al método canActivate() de esa instancia y devuelve el resultado.
  // Este será el valor que Angular use para decidir si puede activar la ruta o no.
  return guardService.canActivate();
};
