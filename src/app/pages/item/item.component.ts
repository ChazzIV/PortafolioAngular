import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoCompleto } from '../../interfaces/producto-completo-interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoCompleto;
  id: string;

  constructor( private route: ActivatedRoute,
               private productosService: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
      // console.log(parametros.id);
      this.productosService.getProducto(parametros.id)
          .subscribe( (producto: ProductoCompleto ) => {
            this.id = parametros.id;
            // console.log(producto);
            this.producto = producto;
          });
    });
  }

}
