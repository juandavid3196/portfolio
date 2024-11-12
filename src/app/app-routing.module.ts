import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectOneComponent } from './components/project-one/project-one.component';
import { ProjectTwoComponent } from './components/project-two/project-two.component';
import { ProjectThreeComponent } from './components/project-three/project-three.component';
import { ProjectFourComponent } from './components/project-four/project-four.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'project-1', component: ProjectOneComponent},
  {path:'project-2', component: ProjectTwoComponent},
  {path:'project-3', component: ProjectThreeComponent},
  {path:'project-4', component: ProjectFourComponent}
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
