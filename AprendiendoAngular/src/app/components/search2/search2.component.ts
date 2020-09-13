import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.css'],
  providers: [ArticleService]
})
export class Search2Component implements OnInit {

  public articles: Article[]
  public search: string

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var search = params['search']
      this.search = search

      this._articleService.search(search).subscribe(
        response => {
          if(response.articles){
            this.articles = response.articles
          }
          console.log(this.articles)
        },
        error => {
          console.log(error)
          this.articles = []
        }
      );
    });
  }

}
