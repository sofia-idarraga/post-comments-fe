import { Injectable } from '@angular/core';
import { AddComment } from '../entities/comments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = "http://localhost:8080"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  addComment(comment: AddComment): Observable<AddComment> {
    return this.http.post<AddComment>(this.url + "/add/comment", comment, this.httpOptions)
      .pipe(
        tap(() => {
          console.log(`added comment w/ id= ${comment.id} to post ${comment.postId}`),
            catchError(this.handleError<AddComment>('addComment'))
        })
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
