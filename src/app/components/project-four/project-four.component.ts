import { Component } from '@angular/core';

@Component({
  selector: 'app-project-four',
  templateUrl: './project-four.component.html',
  styleUrls: ['./project-four.component.scss']
})
export class ProjectFourComponent {
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
