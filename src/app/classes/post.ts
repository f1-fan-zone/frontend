export interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publicationDate: Date;
  user: string;
  postCategory: string;
}
