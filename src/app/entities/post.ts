import { Comment } from "./comments";

export type CreatePost = {
    postId: string;
    title: string;
    author: string;
}

export type Post = {
    id?: string
    aggregateId: string;
    author: string;
    title: string;
    comments: Comment[];
}

