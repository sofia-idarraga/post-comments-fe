import { Component, OnInit, Input } from '@angular/core';
import { AddComment, Comment } from 'src/app/entities/comments';
import { CommentService } from 'src/app/services/comment.service';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() postId?: string;

  @Input() comments: Comment[] = [];

  socketManager?: WebSocketSubject<Comment>;


  constructor(private commentService: CommentService
    , private socket: SocketService) { }

  ngOnInit(): void {
    this.connectToMainSpace();
  }

  connectToMainSpace() {
    this.socketManager = this.socket.connectToSpecificSpace(this.postId ? String(this.postId) : 'main');
    this.socketManager.subscribe(comment => {
      console.log(comment)
      this.comments.unshift(comment)
    });
  }

  add(author: string, content: string): void {
    author = author.trim();
    content = content.trim();
    var postId: string = '';
    if (!author && !content) { return; }
    if (this.postId) {
      postId = this.postId
    }
    var id: string = String(Math.floor(Math.random() * (1000)));
    var comment: AddComment = {
      postId, id, author, content
    }
    this.commentService.addComment(comment)
      .subscribe()

  }


}
