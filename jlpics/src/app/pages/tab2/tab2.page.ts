import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private postService: PostsService, private route: Router, private geolocation: Geolocation, private camera: Camera) { }

  tempImages: string[] = [];
  loadingGeo = false;

  post = {
    message: '',
    coords: null,
    position: false
  };

  async createPost() {

    const created = await this.postService.createPost(this.post);

    this.post = {
      message: '',
      coords: null,
      position: false
    }

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {

    if (!this.post.position) {
      this.post.coords = null;
      return;
    }

    this.loadingGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {

      this.loadingGeo = false;

      const coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
      this.post.coords = coords;

    }).catch((error) => {
      console.log('Error getting location', error);
      this.loadingGeo = false;
    });
  }

  openCamera() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.processImage(options);

  }

  openLibrary() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.processImage(options);
  }

  processImage(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      
      this.postService.postImage(imageData);
      this.tempImages.push(img);
    }, (err) => {
      // Handle error
    });
  }

}
