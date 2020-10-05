import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {
  public article: Article
  public status: string
  public isEdit: boolean
  public page_title: string
  public url: string 

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI: {
      url: Global.url + '/upload-image'
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService) {
    this.article = new Article('', '', '', null, null)
    this.isEdit = true
    this.page_title = 'Editar articulo'
    this.url = Global.url
  }

  ngOnInit(): void {
    this.getArticle()
  }

  onSubmit() {
    this._articleService.update(this.article._id,this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success'
          this.article =  response.articleUpdated
          this._router.navigate(['blog/articulo', this.article._id])
        } else {
          this.status = 'error'
        }

      },
      error => {
        console.log(error)
        this.status = 'error'

      }

    )
  }

  imageUpload(data) {
    let image_data = data.body.image;
    this.article.image = image_data
  }

  getArticle() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._articleService.getArticle(id).subscribe(
        response => {
          if (response.article) {
            this.article = response.article
          } else {
            this._router.navigate(['/home']);
          }
        },
        error => {
          this._router.navigate(['/home']);
        }
      )
    })
  }
}
