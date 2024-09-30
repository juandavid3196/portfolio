import { Component } from '@angular/core';

@Component({
  selector: 'app-project-one',
  templateUrl: './project-two.component.html',
  styleUrls: ['./project-two.component.scss']
})
export class ProjectTwoComponent {
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
