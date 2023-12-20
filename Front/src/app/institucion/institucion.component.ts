import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../servicio/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.scss']
})
export class InstitucionComponent implements OnInit {

  formulario:FormGroup;
  listaInstitucion:any;
  idInstitucion:any;
  
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
        direccion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
        telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        email: new FormControl('', [Validators.required, Validators.email]),
      }
    );

    this.listarInstitucion();
    this.idInstitucion = this.route.snapshot.paramMap.get('id');
    if(this.idInstitucion){
      this.obtenerInstitucion(this.idInstitucion);
    }
    
  }

  listarInstitucion(){
    this.servicio.getInstitucion().subscribe((data:any)=>{
      console.log(data);
      this.listaInstitucion = data;
    });
  }

  crearInstitucion(){
    this.servicio.ingresarInstitucion(this.formulario.value).subscribe((data:any)=>{
      this.listarInstitucion();
      this.resetearInstitucion();
    });
  }

  resetearInstitucion(){
    this.formulario.reset();
  }
  obtEditar(idEquipo: number): void {
    this.obtenerId(idEquipo);
    this.obtenerInstitucion(idEquipo);
  }
  obtenerId(id:any){
    this.router.navigate(['/institucion/' + id]);
  }
  cancelarEdit(){
    this.router.navigate(['/institucion/']);
  }

  obtenerInstitucion(idInstitucion:any){
    this.servicio.getInstitucionId(idInstitucion).subscribe((data:any)=>{
      this.formulario.patchValue({
        nombre: data.nombre,
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email
      });
    });
  }

  editarInstitucion(){
    this.servicio.actualizarInstitucion(this.formulario.value, this.idInstitucion).subscribe((data:any)=>{
      this.listarInstitucion();
      swal.fire({
        title: 'Se ha editado correctamente',
        confirmButtonColor: '#222323',
        confirmButtonText: 'ACEPTAR'
      })
    })
  }
  eliminarInstitucion(id:any){
    this.servicio.deleteInstitucion(id).subscribe((data:any)=>{
      this.listarInstitucion();
      console.log(data);
      swal.fire({
        title: 'Se ha eliminado correctamente',
        confirmButtonColor: '#222323',
        confirmButtonText: 'ACEPTAR'
      })
    });
  }
}
