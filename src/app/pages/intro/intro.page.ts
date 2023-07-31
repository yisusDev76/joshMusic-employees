import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper from 'swiper';
import { Preferences } from '@capacitor/preferences';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {
  @ViewChild('swiper' ,{ static: false })
  swiperRef: ElementRef | undefined;
  swiper?:Swiper

  constructor(private router: Router) { }

  swiperReady(){
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  next() {
    if (this.swiperRef && this.swiperRef) {
      // Depurar porque en swiper 10 hay un error -> console.log("DEBERIA DE PUTAS FUNCIONAR");
      
      this.swiper!.slideNext();
    } else {
      console.error('Swiper no está listo');
    }
  }

  ngOnInit() {
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  async start() {
    console.log("Se hizo click en start, por lo que deberiamos navegar al login");

    try {
      await Preferences.set({key:INTRO_KEY, value:'true'})
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (error) {
      console.error('Error al guardar en Storage: ', error);
    }
  }

}
