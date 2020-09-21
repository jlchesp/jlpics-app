import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('firstSlide', {static: true}) slides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      selected: true
    },
    {
      img: 'av-2.png',
      selected: false
    },
    {
      img: 'av-3.png',
      selected: false
    },
    {
      img: 'av-4.png',
      selected: false
    },
    {
      img: 'av-5.png',
      selected: false
    },
    {
      img: 'av-6.png',
      selected: false
    },
    {
      img: 'av-7.png',
      selected: false
    },
    {
      img: 'av-8.png',
      selected: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  };

  loginUser = {
    email: 'test@gmail.com',
    password: '123456'
  };

  constructor(private userService: UserService, private navCtrl: NavController, private uiService: UiServiceService) { }

  ngOnInit() {
    // Slide lock
    this.slides.lockSwipes(true);
  }

  // Function that makes the call to the login service
  async login(loginForm: NgForm){

    if(loginForm.invalid) {return;}

    const valid = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if(valid){
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.alert('Wrong username or password.');
    }

  }

  // Function that calls the create user service
  register(registerForm: NgForm){
    console.log(registerForm.valid);
  }

  // Function to enable the slide to select avatar
  selectAvatar(avatar){
    this.avatars.forEach(av => av.selected = false);
    avatar.selected = true;
  }

  // Function that locks the slide and navigates to the registration page by pressing the button
  showRegister(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  // Function that blocks the slide and navigates to the login page by pressing the button
  showLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
