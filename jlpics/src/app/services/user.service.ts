import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  user: User = {};

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }

  login(email: string, password: string) {

    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data)
        .subscribe(async res => {
          if (res['ok']) {
            await this.saveToken(res['token']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  logout(){
    this.token = null;
    this.user = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }

  getUser(){

    if(!this.user._id){
      this.validateToken();
    }
    
    return {...this.user};
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validateToken();
  }

  async loadToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validateToken(): Promise<boolean> {

    await this.loadToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user/`, { headers })
        .subscribe(res => {
          if (res['ok']) {
            this.user = res['user'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }

  register(user: User) {

    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, user)
        .subscribe(async res => {
          if (res['ok']) {
            await this.saveToken(res['token']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }

  updateUser(user: User){

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve =>{
      this.http.post(`${URL}/user/update`, user, {headers})
      .subscribe(res=>{
        if (res['ok']) {
          this.saveToken(res['token']);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

}
