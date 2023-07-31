import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomePage } from './pages/home/home.page';
import { FirstPage } from './pages/first/first.page';
import { SecondPage } from './pages/second/second.page';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canActivate:[IntroGuard,AutoLoginGuard]
  },
  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then( m => m.MenuPage),
    canActivate:[AuthGuard],
    children: [
      {
        path: 'home',
        component:HomePage,
        title:'App - Home'
      },
      {
        path: 'first',
        component:FirstPage,
        title: 'Pagina Uno'
      },
      {
        path: 'second',
        component:SecondPage,
      },
      {
        path: '',
        redirectTo: '/menu/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then( m => m.IntroPage)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'first',
    loadComponent: () => import('./pages/first/first.page').then( m => m.FirstPage)
  },
  {
    path: 'second',
    loadComponent: () => import('./pages/second/second.page').then( m => m.SecondPage)
  },
];
