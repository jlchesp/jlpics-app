import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanitizer'
})
export class ImageSanitizerPipe implements PipeTransform {

  constructor( private domSanitazer: DomSanitizer){}

  transform(img: string): any {
    return this.domSanitazer.bypassSecurityTrustStyle( img );
  }

}
