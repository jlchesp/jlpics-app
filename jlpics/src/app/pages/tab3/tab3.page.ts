import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  private user: User = {}

  constructor(private userService: UserService, private uiService: UiServiceService, private postService: PostsService) {}

  ngOnInit(){
    
    this.user = this.userService.getUser();
  }

  async update(updateForm: NgForm){

    if(updateForm.invalid){return;}

    const updateUser = await this.userService.updateUser(this.user);

    if(updateUser){
      this.uiService.presentToast('Registro actualizado');
    } else {
      this.uiService.presentToast('No se pudo actualizar');
    }

  }

  logout(){
    this.postService.postsPage = 0;
    this.userService.logout();
  }

}
