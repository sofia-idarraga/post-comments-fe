import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { CreatePost, Post } from 'src/app/entities/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Post[] = [];


  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
    console.log(this.posts)
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
      .subscribe(post => {
        var newPost: Post = {
          aggregateId,
          title,
          author,
          comments: []
        }
        this.posts.push(newPost);
      });
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts)
  }



}
