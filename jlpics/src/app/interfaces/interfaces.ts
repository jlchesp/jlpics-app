
// List of interfaces that we will use in our application
export interface ResponsePosts {
  ok: boolean;
  page: number;
  posts: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  message?: string;
  user?: User;
  created?: string;
}

export interface User {
  avatar?: string;
  _id?: string;
  name?: string;
  email?: string;
}