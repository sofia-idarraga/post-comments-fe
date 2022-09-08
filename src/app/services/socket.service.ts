import { Injectable } from '@angular/core';
import { Comment } from '../entities/comments';
import { Post } from '../entities/post';
import { Subject, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  urlBase: string = 'ws://localhost:8082'

  constructor() { }
  connectToGeneralSpace(): WebSocketSubject<Post> {
    return webSocket(this.urlBase + '/retrieve/mainSpace');
  }

  connectToSpecificSpace(post: string): WebSocketSubject<Comment> {
    return webSocket(this.urlBase + '/retrieve/${post}');
  }
}
