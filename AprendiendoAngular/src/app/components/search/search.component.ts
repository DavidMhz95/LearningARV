import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public articles: Article[]
  constructor(private _articleService:ArticleService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    // this._route.params.subscribe(params=>{
    //   var search = params['search']
    //   alert(search)
    // })
  }

}
