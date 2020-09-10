import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina-interfaces';
import { EquipoPagina } from '../interfaces/equipo-pagina-interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};

  equipo: EquipoPagina = {};

  cargada = false;

  constructor( private http: HttpClient) {
    console.log('Servicio de pagina listo');

    this.cargarInfo();

    this.cargarEquipo();

   }

   private cargarInfo(): void {
         // leer el archivo json
    this.http.get('assets/data/data-pagina.json') // no funciona si no se utiliza un suscribe
        .subscribe( (resp: InfoPagina) => {
          this.cargada = true;
          this.info = resp;
         // console.log(resp);

        });
   }

   private cargarEquipo(): void {
    this.http.get('https://angular-html-9adfb.firebaseio.com/equipo.json')
        .subscribe( ( resp: EquipoPagina) => {
          this.cargada = true;
          this.equipo = resp;
          // console.log(resp);
        });
   }


}
