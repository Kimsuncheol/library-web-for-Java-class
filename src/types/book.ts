export interface Book {
  isbn: string;
  title: string;
  description: string;
  author: string;
  coverImage?: string; // Optional, as per requirements "potentially an image URL"
}
