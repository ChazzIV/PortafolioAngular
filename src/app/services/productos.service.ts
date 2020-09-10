import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(): any {

    return new Promise( (resolve, reject) => {

      this.http.get('https://angular-html-9adfb.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[]) => {
     // console.log(resp);
      this.productos = resp;

      setTimeout(() => {
        this.cargando = false;
        resolve();
      }, 1000);
    });


    });

  }

  // tslint:disable-next-line: typedef
  getProducto( id: string) {
    return this.http.get(`https://angular-html-9adfb.firebaseio.com/productos/${id}.json`);
  }


  buscarProducto( termino: string): void {

    if ( this.productos.length === 0) {
      this.cargarProductos().then( () => {
        this.filtrarProductos( termino );
      });
    } else {

    }

    this.productosFiltrado = this.productos.filter( producto => {
      return true;
    });

    console.log(this.productosFiltrado);
  }


  private filtrarProductos( termino: string): void {
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( prod );
      }
      
    });
  }


}



