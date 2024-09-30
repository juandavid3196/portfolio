import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectOneComponent } from './components/project-one/project-one.component';
import { ProjectTwoComponent } from './components/project-two/project-two.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'project-1', component: ProjectOneComponent},
  {path:'project-2', component: ProjectTwoComponent}
];

// Configuración para habilitar el scroll a anclas
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',  // Habilita el scroll por ancla
  scrollPositionRestoration: 'enabled'  // Mantiene la posición del scroll al navegar
};

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
