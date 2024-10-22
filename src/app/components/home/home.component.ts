import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  open : boolean =  false;
  
  formData = {
    name: '',
    email: '',
    message: '',
  };
  
  constructor(private router: Router, private emailService: EmailService) { }

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


  onSubmit() {
    const  notyf = new Notyf({
      types: [
        {
          type: 'success',
          background: '#5c58ad',  // Color de fondo para el éxito
          icon: {
            className: 'fas fa-check',
            tagName: 'span',
            text: '',  
          },
        },]
      
      });

    if (this.formData.name && this.formData.email && this.formData.message) {
      this.emailService.sendEmail(this.formData).subscribe(
        (response) => {
          console.log('Email enviado', response);
          this.formData = { name: '', email: '', message: '' };
          notyf.success('Data Sended Successfully');
        },
        (error) => {
          console.error('Error al enviar el email', error);
        }
      );
    }
  }

}
