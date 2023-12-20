import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../servicio/service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {

  formulario:FormGroup;
  listaResultado:any;
  listaMision:any;
  selectedMision: any;
  idResultado:any;
  
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
        estado: new FormControl('', [Validators.required]),
        idMision: new FormControl('', [Validators.required]),
      }
    );

    this.listarMision();
    this.listarResultados();
    this.idResultado = this.route.snapshot.paramMap.get('id');
    if(this.idResultado){
      this.obtenerResultados(this.idResultado);
    }
  }

  listarResultados(){
    this.servicio.getResultados().subscribe((data:any)=>{
      this.listaResultado = data;
    });
  }

  crearResultado(){
    console.log(this.formulario.value);
    this.servicio.ingresarResultados(this.formulario.value).subscribe((data:any)=>{
      this.listarResultados();
      this.resetearResultados();
    });
  }

  resetearResultados(){
    this.formulario.reset();
  }
  obtEditar(idResultados: number): void {
    this.obtenerId(idResultados);
    this.obtenerResultados(idResultados);
  }
  obtenerId(id:any){
    this.router.navigate(['/resultados/' + id]);
  }
  cancelarEdit(){
    this.router.navigate(['/resultados/']);
  }

  obtenerResultados(idEquipo:any){
    this.servicio.getResultadosId(idEquipo).subscribe((data:any)=>{
      this.formulario.patchValue({
        descripcion: data.descripcion,
        estado: data.estado,
        idMision: data.idMision
      });
    });
  }
  editarResultados(){
    this.servicio.actualizarResultados(this.formulario.value, this.idResultado).subscribe((data:any)=>{
      this.listarResultados();
      swal.fire({
        title: 'Se ha editado correctamente',
        confirmButtonColor: '#222323',
        confirmButtonText: 'ACEPTAR'
      })
    })
  }

  eliminarResultados(id:any){
    this.servicio.deleteResultados(id).subscribe((data:any)=>{
      this.listarResultados();
      console.log(data);
      swal.fire({
        title: 'Se ha eliminado correctamente',
        confirmButtonColor: '#222323',
        confirmButtonText: 'ACEPTAR'
      })
    });
  }

  listarMision(){
    this.servicio.getMision().subscribe((data:any)=>{
      this.listaMision = data;
    });
  }

  obtenerNombreMision(idMision: string): string {
    const mision = this.listaMision.find((p:any) => p.idMision === Number(idMision));
    return mision ? mision.nombre : '';
  }

}
