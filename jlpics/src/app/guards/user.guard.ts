import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})

// Guard to protect the routes by validating the token
export class UserGuard implements CanLoad {

  constructor(private userService: UserService){}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.validateToken();
  }
  
}
