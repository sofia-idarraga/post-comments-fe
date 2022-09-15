import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { CreatePost, Post } from 'src/app/entities/post';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {



  show: boolean = false;

  posts: Post[] = [];

  socketManager?: WebSocketSubject<Post>;


  constructor(private postService: PostService, private socket: SocketService) { }



  ngOnInit(): void {
    this.getPosts();
    this.connectToMainSpace();
  }

  connectToMainSpace() {
    this.socketManager = this.socket.connectToGeneralSpace();
    this.socketManager.subscribe(post => {
      console.log(post)
      this.posts.unshift(post)
    });
  }

  add(title: string, author: string): void {

    title = title.trim();
    author = author.trim();

    if (!author && !title) { return; }
    var postId: string = String(Math.floor(Math.random() * (1000)));
    var post: CreatePost = {
      postId, title, author
    }
    var aggregateId = postId
    this.postService.addPost(post)
      .subscribe();
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts)
  }

  closeConnection(): void {
    this.socketManager?.complete();
  }

}
