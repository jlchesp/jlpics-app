import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  enabled = true;

  constructor( private postsService: PostsService ) {}

  ngOnInit() {
    this.nextPosts();
    this.postsService.newPost.subscribe(post =>{  // We add the new post to our post array
      this.posts.unshift(post);
    });
  }

  // Function to refresh the list of posts when sliding down
  refresh(event){
    this.nextPosts(event, true);
    this.enabled = true;
    this.posts = [];
  }

  // Function that is in charge of calling the list of posts
  nextPosts(event?, pull: boolean = false){

    this.postsService.getPosts(pull)
      .subscribe( res => {
        this.posts.push(...res.posts);

        if(event){
          event.target.complete();

          if(res.posts.length === 0){
            this.enabled = false;
          }
        }
      });
  }

}
