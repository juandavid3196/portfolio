import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  open : boolean =  false;
  
  constructor(private router: Router) { }

  // Función para navegar a la sección
  goToSection(section: string, button ?: boolean) {
    this.router.navigate([], { fragment: section });
    if(!button){
      this.toggleMenu();
    }
  }

 toggleMenu() :  void {
  this.open =  !this.open;
 }
}
