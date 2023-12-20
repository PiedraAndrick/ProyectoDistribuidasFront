import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { EquipoComponent } from './equipo/equipo.component';
import { MisionComponent } from './mision/mision.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { TareasComponent } from './tareas/tareas.component';

const routes: Routes = [
  { path: '',pathMatch: 'full',redirectTo: 'institucion'},
  { path: 'personal', component: PersonalComponent },
  { path: 'personal/:id', component: PersonalComponent },
  { path: 'institucion', component: InstitucionComponent },
  { path: 'institucion/:id', component: InstitucionComponent },
  { path: 'equipo', component: EquipoComponent },
  { path: 'equipo/:id', component: EquipoComponent },
  { path: 'mision', component: MisionComponent },
  { path: 'mision/:id', component: MisionComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'resultados/:id', component: ResultadosComponent },
  { path: 'tareas', component: TareasComponent },
  { path: 'tareas/:id', component: TareasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
