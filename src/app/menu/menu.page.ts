import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RouterModule } from '@angular/router';  // Asegúrate de que se importe el RouterModule

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Home Page',
      url: 'home',
    },
    {
      title: 'First Page',
      url: 'first',
    },
    {
      title: 'Second Page',
      url: 'second',
    },
  ];

  selected_path = '';
  /**
   * Aquí nos suscribimos a los eventos del enrutador. Los eventos del enrutador son
   * emitidos durante el ciclo de vida de la navegación y pueden ser útiles para
   * realizar acciones específicas en diferentes puntos de la navegación.
   *
   * Utilizamos el operador `filter()` para filtrar los eventos y quedarnos solo con
   * los eventos `NavigationEnd`. `NavigationEnd` es un tipo específico de evento
   * del enrutador que se emite cuando se completa una navegación. Este evento tiene
   * una propiedad `url` que contiene la URL a la que se ha navegado.
   *
   * En la función que pasamos al operador `subscribe()`, actualizamos la propiedad
   * `selected_path` con la URL del evento `NavigationEnd`. Esto significa que
   * `selected_path` siempre contendrá la URL de la última navegación que se completó.
   *
   * Este código es útil, por ejemplo, para mantener actualizado un menú de
   * navegación lateral con la ruta actualmente seleccionada.
   */
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((ev: NavigationEnd) => {
        this.selected_path = ev.urlAfterRedirects; // cambia ev.url a ev.urlAfterRedirects
        if (this.selected_path.startsWith('/menu/')) {
          // ignora "/menu/"
          this.selected_path = this.selected_path.slice(6);
        }
        // console.log('selected_path:', this.selected_path);
      });
  }

  ngOnInit() {}

}
