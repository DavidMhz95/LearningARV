import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class ArticleService {
    public articulos: Article[]
    public url: string

    constructor(private _http: HttpClient) {
        this.url = Global.url
    }

    pruebas() {
        return 'Soy el servicio de articulos'
    }

    getArticles(last: any = null): Observable<any> {

        var articles = 'articles'
        console.log(last + ' last')
        if (last != null) {
            articles = 'articles/true'
        }
        return this._http.get(this.url + articles);
    }

    getArticle(articleId): Observable<any> {
        return this._http.get(this.url + 'article/' + articleId)
    }

    search(searchString): Observable<any> {
        return this._http.get(this.url + 'search/' + searchString)
    }

}