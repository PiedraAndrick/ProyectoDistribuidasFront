import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../servicio/service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import swal from 'sweetalert2'
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  formulario:FormGroup;
  listaTareas:any;
  listaMision:any;
  selectedMision: any;
  idTareas:any;

  constructor(
    private fb: FormBuilder,
    public servicio: ServiceService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.formulario = this.fb.group(
      {
        descripcion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        idMision: new FormControl('', [Validators.required]),
      }
    );

    this.listarMision();
    this.listarTareas();
    this.idTareas = this.route.snapshot.paramMap.get('id');
    if(this.idTareas){
      this.obtenerTareas(this.idTareas);
    }
  }

  
  listarTareas(){
    this.servicio.getTareas().subscribe((data:any)=>{
      this.listaTareas = data;
    });
  }

  crearTareas(){
    console.log(this.formulario.value);
    this.servicio.ingresarTareas(this.formulario.value).subscribe((data:any)=>{
      this.listarTareas();
      this.resetearTareas();
    });
  }

  resetearTareas(){
    this.formulario.reset();
  }
  obtEditar(idTareas: number): void {
    this.obtenerId(idTareas);
    this.obtenerTareas(idTareas);
  }
  obtenerId(id:any){
    this.router.navigate(['/tareas/' + id]);
  }
  cancelarEdit(){
    this.router.navigate(['/tareas/']);
  }

  obtenerTareas(idTareas:any){
    this.servicio.getTareasId(idTareas).subscribe((data:any)=>{
      this.formulario.patchValue({
        descripcion: data.descripcion,
        idMision: data.idMision
      });
    });
  }
  editarTareas(){
    this.servicio.actualizarTareas(this.formulario.value, this.idTareas).subscribe((data:any)=>{
      this.listarTareas();
      swal.fire({
        title: 'Se ha editado correctamente',
        confirmButtonColor: '#222323',
        confirmButtonText: 'ACEPTAR'
      })
    })
  }


}
