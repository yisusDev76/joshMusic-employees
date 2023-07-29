import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { provideRouter, Route, RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class HomePage {
  constructor(private authService: AuthenticationService,
    private router: Router,
    private menuCtrl:MenuController,
    ) {}

 async logout() {
   await this.authService.logout();
   this.router.navigateByUrl('/', { replaceUrl: true });
 }

 ngOnInit() {
 }

 openMenu() {
   this.menuCtrl.toggle();
   }
}
