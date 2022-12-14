import { Component, OnInit, Input } from '@angular/core';
import { AddComment, Comment } from 'src/app/entities/comments';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Post } from 'src/app/entities/post';
import { PostService } from 'src/app/services/post.service';
import { StateService } from 'src/app/services/state.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  postComments: Comment[] = [];
  @Input() post: Post = {
    id: '',
    aggregateId: '',
    author: '',
    title: '',
    comments: this.postComments
  };

  comments = this.post.comments;

  stateOfUser: any;

  socketManager?: WebSocketSubject<Comment>;


  constructor(private service: PostService
    , private socket: SocketService,
    private state: StateService,) { }

  ngOnInit(): void {
    var element = document.getElementById("toHide");
    element?.setAttribute("id", "toHide" + this.post.aggregateId);
    console.log(this.post.comments)
    this.connectToMainSpace();
    this.validateLogin()
  }

  validateLogin(): boolean {
    let validate = false;
    this.state.state.subscribe(currentState => {
      this.stateOfUser = currentState;
      validate = true
    })

    return validate;
  }

  connectToMainSpace() {
    this.socketManager = this.socket.connectToSpecificSpace(this.post.aggregateId);
    this.socketManager.subscribe(comment => {
      console.log(comment)
      this.post.comments.push(comment)
    });
  }

  add(author: string, content: string): void {
    author = author.trim();
    content = content.trim();
    var postId: string = '';
    if (!author && !content) { return; }
    if (this.post.aggregateId) {
      postId = this.post.aggregateId
    }
    var id: string = String(Math.floor(Math.random() * (1000)));
    var comment: AddComment = {
      postId, id, author, content
    }
    this.service.addComment(comment, this.stateOfUser.token)
      .subscribe()

  }

  myFunction(id: string) {
    var select = document.querySelector("#toHide" + id);
    select?.classList.toggle("hide");
  }


}
