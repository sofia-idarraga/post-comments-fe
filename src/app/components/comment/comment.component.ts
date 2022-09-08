import { Component, OnInit, Input } from '@angular/core';
import { AddComment, Comment } from 'src/app/entities/comments';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() postId?: string;

  @Input() comments: Comment[] = [];

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
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
      .subscribe(comment => {
        var newComment: Comment = {
          id,
          postId,
          author,
          content
        }
        this.comments.push(newComment);
      })

  }


}
