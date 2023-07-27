import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
export const TOKEN_KEY = 'my-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null as unknown as boolean);
  token = '';

  constructor(private http : HttpClient) {
    this.loadToken();
  }

  async loadToken(){
    const token = await Preferences.get({key:TOKEN_KEY});
    if (token && token.value) {
      // console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: {email: string, password:string}): Observable<any> {
    return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => {
        return from(Preferences.set({key:TOKEN_KEY, value:token}));
      }),
      tap((_: any) => {
        this.isAuthenticated.next(true);
      })
    )
  }

  logout():Promise<void>{
    this.isAuthenticated.next(false);
    return Preferences.remove({ key: TOKEN_KEY });
  }
}
