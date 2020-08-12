import { Injectable }from '@angular/core';
import {Pelicula} from '../models/pelicula';

@Injectable()
export class PeliculaService{
    public peliculas: Pelicula[]
    
    constructor(){
        this.peliculas = [
            new Pelicula('Spiderman 4', 2019, 'https://dam.empireonline.com.mx/wp-content/uploads/2019/07/peliculas-de-spider-man-tom-holland.jpg'),
            new Pelicula('Vengadores Endgame', 2018, 'https://www.tonica.la/__export/1587957633788/sites/debate/img/2020/04/26/avengers-endgame-momentos-epicos-no-podemos-dejar-ver_1.jpg_423682103.jpg'),
            new Pelicula('Batman vs Superman', 2013, 'https://i.ytimg.com/vi/Vzi5Q5aIGJU/maxresdefault.jpg')
          ];
    }
    holaMundo(){
        return 'Hola mundo desde un servicio de angular'
    }

    getPeliculas(){
        return this.peliculas;
    }
}