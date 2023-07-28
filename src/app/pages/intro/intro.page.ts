import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper from 'swiper';

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

  constructor() { }

  swiperReady(){
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  next() {
    if (this.swiperRef && this.swiperRef) {
      console.log("DEBERIA DE PUTAS FUNCIONAR");
      
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

}
