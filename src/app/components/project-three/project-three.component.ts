import { Component } from '@angular/core';

@Component({
  selector: 'app-project-three',
  templateUrl: './project-three.component.html',
  styleUrls: ['./project-three.component.scss']
})
export class ProjectThreeComponent {
  imageSelected :  string = '';
  openViewer : boolean =  false;
  
  openImage(image:string) : void {
    this.openViewer = true;
    this.imageSelected = image;
  }

  closeOpenViewer() : void {
    this.openViewer =  false;
  }
}
