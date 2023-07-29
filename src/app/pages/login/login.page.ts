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
        email:['eve.holt@reqres.in',[Validators.required, Validators.email]],
        password:['cityslicka',[Validators.required,Validators.minLength(6)]]
      }
    );
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials?.value).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.router.navigateByUrl('/menu', { replaceUrl: true });
      },
      error: async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: res.error.error,
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

}
