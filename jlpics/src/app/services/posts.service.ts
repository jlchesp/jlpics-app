import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post, ResponsePosts } from '../interfaces/interfaces';
import { UserService } from './user.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  newPost = new EventEmitter<Post>();
  postsPage = 0;

  constructor(private http: HttpClient, private userService: UserService, private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false) {

    if (pull) {
      this.postsPage = 0;
    }

    this.postsPage++;
    return this.http.get<ResponsePosts>(`${URL}/posts/?page=${this.postsPage}`);

  }

  createPost(post) {

    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise(resolve => {
      this.http.post<ResponsePosts>(`${URL}/posts/`, post, { headers })
        .subscribe(res => {
          this.newPost.emit(res['post']);
          resolve(true);
        });
    });
  }

  postImage(img: string) {
    const options: FileUploadOptions = {

      fileKey: 'image',
      headers: {
        'x-token': this.userService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, `${URL}/posts/upload`, options)
      .then(data=>{
        console.log(data);
      }).catch(err =>{
        console.log('error', err);
      })
  }
}
