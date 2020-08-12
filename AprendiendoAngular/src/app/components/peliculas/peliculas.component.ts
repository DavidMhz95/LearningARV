import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {Pelicula} from '../../models/pelicula';
  
@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string 
  public peliculas: Pelicula[]
  public favorita : Pelicula
  public fecha: any

  constructor() { 
    this.titulo ="Componente Peliculas"
    this.peliculas = [
      new Pelicula('Spiderman 4', 2019, 'https://dam.empireonline.com.mx/wp-content/uploads/2019/07/peliculas-de-spider-man-tom-holland.jpg'),
      new Pelicula('Vengadores Endgame', 2018, 'https://www.tonica.la/__export/1587957633788/sites/debate/img/2020/04/26/avengers-endgame-momentos-epicos-no-podemos-dejar-ver_1.jpg_423682103.jpg'),
      new Pelicula('Batman vs Superman', 2013, 'https://i.ytimg.com/vi/Vzi5Q5aIGJU/maxresdefault.jpg')
    ]
    this.fecha= new Date(2020,8,12)
        
  }

  ngOnInit(): void {
    console.log('Componente iniciado')
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
