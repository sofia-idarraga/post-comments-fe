import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreatePost, Post } from '../entities/post';
import { catchError, Observable, of, tap } from 'rxjs';
import { AddComment } from '../entities/comments';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  // private url = "http://localhost:8080"
  // private urlBeta = "http://localhost:8081"

  private url = "https://alpha-sim-heroku.herokuapp.com"
  private urlBeta = "https://glacial-bayou-47025.herokuapp.com"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  addPost(post: CreatePost, token: string): Observable<CreatePost> {
    return this.http.post<CreatePost>(
      this.url + "/create/post",
      post,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      })
      .pipe(
        tap((newPost: CreatePost) => {
          console.log(`added post w/ id=${post.postId}`),
            catchError(this.handleError<CreatePost>('addPost'))
        })
      )
  }

  addComment(comment: AddComment, token: string): Observable<AddComment> {
    return this.http.post<AddComment>(this.url + "/add/comment",
      comment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    })
      .pipe(
        tap(() => {
          console.log(`added comment w/ id= ${comment.id} to post ${comment.postId}`),
            catchError(this.handleError<AddComment>('addComment'))
        })
      )
  }

  logIn(user: any) {
    return this.http.post<any>(this.url + "/auth/login", user, this.httpOptions)
      .pipe(
        tap(() => {
          console.log(` user loged with ${user.username}`),
            catchError(this.handleError<any>('logIn'))
        })
      )
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.urlBeta + "/posts", this.httpOptions)
  }

  getPost(id: string | null): Observable<Post> {
    const url = `${this.urlBeta}/post/${id}`;
    return this.http.get<Post>(url, this.httpOptions).pipe(
      tap(_ => console.log(`geted post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
