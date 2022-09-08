export type Comment = {
    id: string;
    postId: string;
    author: string;
    content: string;
}

export type AddComment = {
    postId: string;
    id: string;
    author: string;
    content: string;
}