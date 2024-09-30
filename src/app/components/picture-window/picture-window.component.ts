import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-picture-window',
  templateUrl: './picture-window.component.html',
  styleUrls: ['./picture-window.component.scss']
})
export class PictureWindowComponent {
  close : boolean = false;
  @Output() formClose = new EventEmitter<void>();
  @Input() imgSelected : string = '';

  onClose():void {
    this.close =  true;
    setTimeout(()=>{
      this.formClose.emit();
    },500);
  }
}
