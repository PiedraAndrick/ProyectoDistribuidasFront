import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../servicio/service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss']
})
export class EquipoComponent implements OnInit {

  formulario:FormGroup;
  listaEquipo:any;
  listaPersonal:any;
  selectedPersonal: any;
  idEquipo:any;
  constructor(
    private fb: FormBuilder,
    public servicio: ServiceService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.formulario = this.fb.group(
      {
        nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        idPersona: new FormControl(this.selectedPersonal, [Validators.required]),
      }
    );

    this.listarPersonal();
    this.listarEquipo();
    this.idEquipo = this.route.snapshot.paramMap.get('id');
    if(this.idEquipo){
      this.obtenerEquipo(this.idEquipo);
    }

  }

  listarEquipo(){
    this.servicio.getEquipo().subscribe((data:any)=>{
      console.log(data);
      this.listaEquipo = data;
    });
  }

  crearEquipo(){
    console.log(this.formulario.value);
    this.servicio.ingresarEquipo(this.formulario.value).subscribe((data:any)=>{
      this.listarEquipo();
      this.resetearEquipo();
    });
  }

  resetearEquipo(){
    this.formulario.reset();
  }
  obtEditar(idEquipo: number): void {
    this.obtenerId(idEquipo);
    this.obtenerEquipo(idEquipo);
  }
  obtenerId(id:any){
    this.router.navigate(['/equipo/' + id]);
  }
  cancelarEdit(){
    this.router.navigate(['/equipo/']);
  }

  obtenerEquipo(idEquipo:any){
    this.servicio.getEquipoId(idEquipo).subscribe((data:any)=>{
      this.formulario.patchValue({
        nombre: data.nombre,
        idPersona: data.idPersona
      });
    });
  }
  editarEquipo(){
    this.servicio.actualizarEquipo(this.formulario.value, this.idEquipo).subscribe((data:any)=>{
      this.listarEquipo();
      swal.fire({
        title: 'Se ha editado correctamente',
        confirmButtonColor: '#222323',
        confirmButtonText: 'ACEPTAR'
      })
    })
  }

  eliminarEquipo(id:any){
    this.servicio.deleteEquipo(id).subscribe((data:any)=>{
      this.listarEquipo();
      console.log(data);
      swal.fire({
        title: 'Se ha eliminado correctamente',
        confirmButtonColor: '#222323',
        confirmButtonText: 'ACEPTAR'
      })
    });
  }

  listarPersonal(){
    this.servicio.getPersonal().subscribe((data:any)=>{
      this.listaPersonal = data;
    });
  }

  obtenerNombrePersonal(idPersonal: string): string {
    const personal = this.listaPersonal.find((p:any) => p.idPersonal === Number(idPersonal));
    return personal ? personal.nombre : '';
  }
}
