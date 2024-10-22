import { Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from '../components/post-grid/post-grid.component';

type ApiUrl = typeof environment['apiUrl'];

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private api: ApiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getPosts (): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.api}/posts`)
      .pipe(
        catchError(
          error => {
            throw new Error(error);
          }
        )
      );
  }

}
