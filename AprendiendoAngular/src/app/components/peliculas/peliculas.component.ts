import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {Pelicula} from '../../models/pelicula';
import { PeliculaService } from 'src/app/services/pelicula.service';
  
@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string 
  public peliculas: Pelicula[]
  public favorita : Pelicula
  public fecha: any

  constructor( private _peliculaService: PeliculaService) { 
    this.titulo ="Componente Peliculas"
    this.peliculas = this._peliculaService.getPeliculas();
    this.fecha= new Date(2020,8,12)
        
  }

  ngOnInit(): void {
    console.log('Componente iniciado')
    console.log(this._peliculaService.holaMundo())
  }

  ngDoCheck(){
    console.log('DoCheck Lanzado')
  }

  ngOnDestroy(){
    console.log('El componente se va a eliminar')
  }

  public cambiarTitulo(){
    this.titulo ="El titulo ha sido cambiado"
  }

  mostrarFavorita(event){
    this.favorita = event.pelicula
  }


}
