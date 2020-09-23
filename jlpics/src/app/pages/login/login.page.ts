import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('firstSlide', { static: true }) slides: IonSlides;

  loginUser = {
    email: 'test@gmail.com',
    password: '123456'
  };

  userRegister: User = {
    email: 'test',
    password: '123456',
    name: 'Test',
    avatar: 'av-1.png'
  };

  constructor(private userService: UserService, private navCtrl: NavController, private uiService: UiServiceService) { }

  ngOnInit() {
    // Slide lock
    this.slides.lockSwipes(true);
  }

  // Function that makes the call to the login service
  async login(loginForm: NgForm) {

    if (loginForm.invalid) { return; }

    const valid = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if (valid) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiService.alert('Wrong username or password.');
    }

  }

  // Function that calls the create user service
  async register(registerForm: NgForm) {

    if (registerForm.invalid) { return; }

    const valid = await this.userService.register(this.userRegister);

    if (valid) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      this.uiService.alert('The email already exists.');
    }

  }

  // Function that locks the slide and navigates to the registration page by pressing the button
  showRegister() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  // Function that blocks the slide and navigates to the login page by pressing the button
  showLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
