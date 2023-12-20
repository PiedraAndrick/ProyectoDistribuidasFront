import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../servicio/service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],

})
export class PersonalComponent implements OnInit {

  formulario:FormGroup;
  listaPersonal:any;
  listaInstitucion:any;
  selectedInstitucion: any;
  idPersonal:any;
  
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
        apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        genero: new FormControl('', [Validators.required]),
        fechaNacimiento: new FormControl('', [Validators.required]),
        edad: new FormControl('', [Validators.required]),
        idInstitucion: new FormControl(this.selectedInstitucion, [Validators.required]),
      }
    );

    this.listarInstitucion();
    this.listarPersonal();
    this.idPersonal = this.route.snapshot.paramMap.get('id');

    if(this.idPersonal){
      this.obtenerPersonal(this.idPersonal);
    }
  }

  listarPersonal(){
    this.servicio.getPersonal().subscribe((data:any)=>{
      console.log(data);
      this.listaPersonal = data;
    });
  }

  crearPersonal(){
    const fechaNacimiento = new Date(this.formulario.value.fechaNacimiento);
    const fechaFormateada = fechaNacimiento.toISOString().split('T')[0];
    
    this.formulario.patchValue({fechaNacimiento: fechaFormateada,});
    this.servicio.ingresarPersonal(this.formulario.value).subscribe((data:any)=>{
      this.listarPersonal();
      this.resetearPersonal();
    });
  }

  resetearPersonal(){
    this.formulario.reset();
  }
  obtEditar(idEquipo: number): void {
    this.obtenerId(idEquipo);
    this.obtenerPersonal(idEquipo);
  }
  obtenerId(id:any){
    this.router.navigate(['/personal/' + id]);
  }
  cancelarEdit(){
    this.router.navigate(['/personal/']);
  }

  obtenerPersonal(idPersonal:any){
    this.servicio.getPersonalId(idPersonal).subscribe((data:any)=>{
      const fechaNacimiento = new Date(data.fechaNacimiento);
      const fechaFormateada = fechaNacimiento.toISOString().split('T')[0];
      this.formulario.patchValue({
        nombre: data.nombre,
        apellido: data.apellido,
        genero: data.genero,
        fechaNacimiento: fechaFormateada,
        edad: data.edad,
        idInstitucion: data.idInstitucion
      });
    });
  }
  editarPersonal(){
    this.servicio.actualizarPersonal(this.formulario.value, this.idPersonal).subscribe((data:any)=>{
      this.listarPersonal();
      swal.fire({
        title: 'Se ha editado correctamente',
        confirmButtonColor: '#222323',
        confirmButtonText: 'ACEPTAR'
      })
    })
  }

  eliminarPersonal(id:any){
    this.servicio.deletePersonal(id).subscribe((data:any)=>{
      this.listarPersonal();
      console.log(data);
      swal.fire({
        title: 'Se ha eliminado correctamente',
        confirmButtonColor: '#222323',
        confirmButtonText: 'ACEPTAR'
      })
    });
  }

  listarInstitucion(){
    this.servicio.getInstitucion().subscribe((data:any)=>{
      this.listaInstitucion = data;
    });
  }

  obtenerNombreInstitucion(idInstitucion: string): string {

    const institucion = this.listaInstitucion.find((p: any) => p.idInstitucion === Number(idInstitucion));
    return institucion ? institucion.nombre : '';
  }

}
