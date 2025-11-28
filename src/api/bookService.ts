import axiosClient from "./axiosClient";
import { Book, History } from "../types/book";

export const getHistoriesAPI = async (): Promise<History[]> => {
  const response = await axiosClient.get<History[]>("/histories");
  console.log(response.data);
  return response.data;
};

export const getBooks = async (): Promise<Book[]> => {
  const response = await axiosClient.get<Book[]>("/books");
  return response.data;
};

export const getBook = async (
  isbn: string,
  title?: string,
  author?: string
): Promise<Book | false> => {
  try {
    const response = await axiosClient.get<Book>("/book", {
      params: { isbn, title, author },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const searchBooksAPI = async (query: string): Promise<Book[]> => {
  try {
    const response = await axiosClient.get<Book | Book[] | boolean>("/book", {
      params: { title: query },
      withCredentials: true,
    });

    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && typeof response.data === "object") {
      return [response.data as Book];
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const addBook = async (
  book: Omit<Book, "coverImage">
): Promise<boolean> => {
  try {
    const response = await axiosClient.post<boolean>("/book", book, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const deleteBook = async (isbn: string): Promise<boolean> => {
  try {
    const response = await axiosClient.delete<boolean>("/book", {
      data: { isbn },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete book", error);
    return false;
  }
};

export const borrowBook = async (isbn: string): Promise<boolean> => {
  try {
    const response = await axiosClient.post<boolean>(
      "/borrow",
      { isbn },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const returnBook = async (isbn: string): Promise<boolean> => {
  try {
    const response = await axiosClient.post<boolean>(
      "/return",
      { isbn },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return false;
  }
};
