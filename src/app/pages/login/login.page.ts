import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {
  credentials!:FormGroup;
  failedAttempts = 0;
  canTryAgain = true;
  tryAgainTimeout: any = null;

  constructor(
    private fb:FormBuilder,
    private authService:AuthenticationService,
    private alertController:AlertController,
    private router:Router,
    private loadingController:LoadingController,
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group(
      {
        email:['eve.holt@reqres.in',[Validators.required]],
        password:['cityslicka',[Validators.required,Validators.minLength(6)]]
      }
    );
  }

  ngOnDestroy() {
    if (this.tryAgainTimeout) {
      clearTimeout(this.tryAgainTimeout);
    }
  }

  async login() {
    if (!this.canTryAgain) {
      // Si no puede intentarlo de nuevo, muestra un mensaje de error y termina la función
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Too many failed attempts, please try again later.',
        buttons: ['OK']
      });

      alert.present();
      return;
    }

    const loading = await this.loadingController.create();
    await loading.present();
    
    this.authService.login(this.credentials?.value).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.failedAttempts = 0; // Restablece el contador de intentos fallidos
        this.router.navigateByUrl('/app', { replaceUrl: true });
      },
      error: async (res) => {
        this.failedAttempts++; // Incrementa el contador de intentos fallidos
        if (this.failedAttempts >= 4) {
          // Si ha habido 4 o más intentos fallidos, establece canTryAgain en falso y establece un temporizador
          this.canTryAgain = false;
          this.tryAgainTimeout = setTimeout(() => {
            this.canTryAgain = true;
            this.failedAttempts = 0; // Restablece el contador después del tiempo de espera
          }, 60000); // 60000 milisegundos = 1 minuto
        }
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: res.error.message,
          buttons: ['OK']
        });

        alert.present();
      }
    });
  }


  get email(){
    return this.credentials.get('email');
  }
  get password(){
    return this.credentials.get('password');
  }

  togglePassword(idInput:string,idIconEye:string) {
    const passwordInput = document.getElementById(idInput) as HTMLInputElement;
    const iconEye = document.getElementById(idIconEye) as HTMLElement;
  

    if (passwordInput.getAttribute('type') === 'password') {
      passwordInput.setAttribute('type', 'text');
      iconEye.setAttribute('name', 'eye-off');
    } else {
      passwordInput?.setAttribute('type', 'password');
      iconEye.setAttribute('name', 'eye');
    }
  }

  clearContent(inputId: string) {
    const inputElement: any = document.getElementById(inputId);
    if (inputElement) {
      if(inputId === 'input_email') {
        this.credentials.get('email')?.setValue('');
      } else if(inputId === 'input_password') {
        this.credentials.get('password')?.setValue('');
      }
    }
  }
  
  onKeyUp(event: KeyboardEvent) {
    const passwordInput = this.credentials.get('password');

    if (event.key === 'Enter' && passwordInput?.value.trim() !== '' && passwordInput?.value.length >= 6) {
      this.login();
    }
  }

}
