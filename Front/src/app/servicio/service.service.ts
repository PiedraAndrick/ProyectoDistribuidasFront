import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private URL = 'http://localhost:8080';

  constructor(
    private http:HttpClient
  ) { }

  ingresarPersonal(data:any) {
    return this.http.post<any>(`${this.URL}/GuardarPersonal`, data);
  }

  getPersonal() {
    return this.http.get<any>(`${this.URL}/listarPersonal`);
  }
  getPersonalId(id:any) {
    return this.http.get<any>(`${this.URL}/busquedaPersonal/${id}`);
  }
  actualizarPersonal(data:any, id:any) {
    return this.http.put<any>(`${this.URL}/editarPersonal/${id}`, data);
  }
  deletePersonal(id:any) {
    return this.http.delete<any>(`${this.URL}/eliminarPersonal/${id}`);
  }

  ingresarInstitucion(data:any) {
    return this.http.post<any>(`${this.URL}/GuardarInstitucion`, data);
  }
  getInstitucion() {
    return this.http.get<any>(`${this.URL}/listarInstitucion`);
  }
  getInstitucionId(id:any) {
    return this.http.get<any>(`${this.URL}/busquedaInstitucion/${id}`);
  }
  actualizarInstitucion(data:any, id:any) {
    return this.http.put<any>(`${this.URL}/editarInstitucion/${id}`, data);
  }
  deleteInstitucion(id:any) {
    return this.http.delete<any>(`${this.URL}/eliminarInstitucion/${id}`);
  }

  ingresarEquipo(data:any) {
    return this.http.post<any>(`${this.URL}/GuardarEquipo`, data);
  }
  getEquipo() {
    return this.http.get<any>(`${this.URL}/listarEquipo`);
  }
  getEquipoId(id:any) {
    return this.http.get<any>(`${this.URL}/busquedaEquipo/${id}`);
  }
  actualizarEquipo(data:any, id:any) {
    return this.http.put<any>(`${this.URL}/editarEquipo/${id}`, data);
  }
  deleteEquipo(id:any) {
    return this.http.delete<any>(`${this.URL}/eliminarEquipo/${id}`);
  }

  ingresarMision(data:any) {
    return this.http.post<any>(`${this.URL}/GuardarMision`, data);
  }
  getMision() {
    return this.http.get<any>(`${this.URL}/listarMision`);
  }
  getMisionId(id:any) {
    return this.http.get<any>(`${this.URL}/busquedaMision/${id}`);
  }
  actualizarMision(data:any, id:any) {
    return this.http.put<any>(`${this.URL}/editarMision/${id}`, data);
  }
  deleteMision(id:any) {
    return this.http.delete<any>(`${this.URL}/eliminarMision/${id}`);
  }

  ingresarResultados(data:any) {
    return this.http.post<any>(`${this.URL}/GuardarResultados`, data);
  }
  getResultados() {
    return this.http.get<any>(`${this.URL}/listarResultados`);
  }
  getResultadosId(id:any) {
    return this.http.get<any>(`${this.URL}/busquedaResultados/${id}`);
  }
  actualizarResultados(data:any, id:any) {
    return this.http.put<any>(`${this.URL}/editarResultados/${id}`, data);
  }
  deleteResultados(id:any) {
    return this.http.delete<any>(`${this.URL}/eliminarResultados/${id}`);
  }

  ingresarTareas(data:any) {
    return this.http.post<any>(`${this.URL}/GuardarTareas`, data);
  }
  getTareas() {
    return this.http.get<any>(`${this.URL}/listarTareas`);
  }
  getTareasId(id:any) {
    return this.http.get<any>(`${this.URL}/busquedaTareas/${id}`);
  }
  actualizarTareas(data:any, id:any) {
    return this.http.post<any>(`${this.URL}/editarTareas/${id}`, data);
  }
  deleteTareas(id:any) {
    return this.http.delete<any>(`${this.URL}/eliminarTareas/${id}`);
  }

}
