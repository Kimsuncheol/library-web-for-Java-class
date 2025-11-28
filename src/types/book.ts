export interface Book {
  isbn: string;
  title: string;
  description: string;
  author: string;
  // isBorrowed?: boolean;
  coverImage?: string; // Optional, as per requirements "potentially an image URL"
}

export interface History {
  id: number;
  book: Book;
  date: Date;
  content: string;
}
