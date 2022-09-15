import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Comment, AddComment } from 'src/app/entities/comments';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { Post } from 'src/app/entities/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  postComments: Comment[] = [];
  post: Post = {
    id: '',
    aggregateId: '',
    author: '',
    title: '',
    comments: this.postComments,
  };

  // post: Post | undefined;

  socketManager?: WebSocketSubject<Comment>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private socket: SocketService,
    private service: PostService
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    this.service.getPost(id).subscribe((post) => {
      this.post = post;
      console.log(this.post);
      this.connectToMainSpace();
    });
  }

  connectToMainSpace() {
    this.socketManager = this.socket.connectToSpecificSpace(
      this.post ? this.post.aggregateId : 'mainSpace'
    );
    this.socketManager.subscribe((comment) => {
      console.log(comment);
      this.post?.comments.push(comment);
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
    this.service.addComment(comment)
      .subscribe()
  }

  closeSession() {
    this.location.back();
    this.socketManager?.complete()
  }
}
