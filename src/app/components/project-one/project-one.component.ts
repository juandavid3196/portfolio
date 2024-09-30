import { Component } from '@angular/core';

@Component({
  selector: 'app-project-one',
  templateUrl: './project-one.component.html',
  styleUrls: ['./project-one.component.scss']
})
export class ProjectOneComponent {
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
