import {Injectable} from 'angular2/core';
import {Http, Request} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import {Settings} from '../../settings';
import {MyRequestOptions} from './myRequestOptions';

@Injectable()
export class PostService {
  postSingle: any[];
  postCollection: any[];
  pagedResults: PagedResult;

  constructor(private _http: Http) {
    this.postSingle = [];
    this.postCollection = [];
    this.pagedResults = new PagedResult();
  }

  fetchSinglePost(slug: string): Observable<void> {
    var requestOptions = new MyRequestOptions();
    var options = requestOptions.merge({
      url: Settings.apiEndPoint + Settings.apiNamespace + '/posts/?slug=' + slug + '',
    });

    return this._http.request(new Request(options))
      .map((responseData) => {
        let data = responseData.json();
        let post: any[] = [];
        this.postSingle = [];

        if (data) {
          data.forEach((d: any) => post.push(Object.assign(d)));
          this.postSingle = post[0];
          console.log('POST SINGLE: ', this.postSingle);
        }

        // this.setPagedResult(1);
      }, (error: any) => {
        console.log(error);
      });
  }

  fetchAllPosts(): Observable<void> {
    var requestOptions = new MyRequestOptions();
    var options = requestOptions.merge({
      url: Settings.apiEndPoint + Settings.apiNamespace + '/posts/',
    });

    return this._http.request(new Request(options))
      .map((responseData) => {
        let data = responseData.json();
        let posts: any[] = [];
        this.postCollection = [];

        if (data) {
          data.forEach((d: any) => posts.push(Object.assign(d)));
          this.postCollection = posts;

          console.log('POST COLLECTION: ', this.postCollection);
        }

        this.setPagedResult(1);
      }, (error: any) => {
        console.log(error);
      });
  }

  setPagedResult(pageNumber: number) {
    this.pagedResults.pageNumber = pageNumber;
    this.pagedResults.posts = this.postCollection.slice((pageNumber - 1) * 25, pageNumber * 25);
    this.pagedResults.postsTotal = this.postCollection.length;
  }
}

export class PagedResult {
  posts: any[];
  pageNumber: number;
  postsTotal: number;
}
