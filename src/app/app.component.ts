import { Component } from '@angular/core';
//import { Alumno } from './models/alumno';
import { ArticulosService } from './articulos.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CrudAngular';

  articulos = null;

  art = {
    codigo: 0,
    descripcion: null,
    precio: null,
    proveedor: null,
    fabricante: null
  }

  constructor(private articulosServicio: ArticulosService) { }

  ngOnInit() {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.articulosServicio.recuperarTodos().subscribe(result => this.articulos = result);
  }

  alta() {
    if(this.art.descripcion != '' && this.art.precio < 0 && this.art.proveedor != '' && this.art.fabricante != ''){
      this.articulosServicio.alta(this.art).subscribe(datos => {
        if (datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
          this.recuperarTodos();
          this.art = {codigo: 0, descripcion: null, precio: null, proveedor: null, fabricante: null};
        }
      });
    }else{
      alert("No se permiten campos vacios");
    }
  }

  baja(codigo) {
    if (confirm('¿Esta seguro de elimiar el Registro?')) {
      this.articulosServicio.baja(codigo).subscribe(datos => {
        if (datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
          this.recuperarTodos();
        }
      });
    }
  }

  modificacion() {
    if(this.art.descripcion != '' && this.art.precio < 0 && this.art.proveedor != '' && this.art.fabricante != ''){
      this.articulosServicio.modificacion(this.art).subscribe(datos => {
        if (datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
          this.recuperarTodos();
          this.art = {codigo: 0, descripcion: null, precio: null, proveedor: null, fabricante: null};
        }
      });
    }else{
      alert("No se permiten campos vacios");
    }
  }

  seleccionar(codigo) {
    this.articulosServicio.seleccionar(codigo).subscribe(result => this.art = result[0]);
  }

  hayRegistros() {
    return true;
  }    

}
