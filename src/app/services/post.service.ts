import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreatePost, Post } from '../entities/post';
import { catchError, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = "http://localhost:8080"
  private urlBeta = "http://localhost:8081"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  addPost(post: CreatePost): Observable<CreatePost> {
    return this.http.post<CreatePost>(this.url + "/create/post", post, this.httpOptions)
      .pipe(
        tap((newPost: CreatePost) => {
          console.log(`added post w/ id=${post.postId}`),
            catchError(this.handleError<CreatePost>('addPost'))
        })
      )
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.urlBeta + "/posts", this.httpOptions)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
