import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponsePosts } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsPage = 0;

  constructor( private http: HttpClient ) { }

  getPosts(pull: boolean = false) {

    if(pull){
      this.postsPage = 0;
    }

    this.postsPage ++;
    return this.http.get<ResponsePosts>(`${URL}/posts/?page=${this.postsPage}`);
    
  }
}
