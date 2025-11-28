import axiosClient from "./axiosClient";
import { Book, History } from "../types/book";

export const getHistoriesAPI = async (): Promise<History[]> => {
  const response = await axiosClient.get<History[]>("/histories");
  return response.data;
};

export const getBooks = async (): Promise<Book[]> => {
  const response = await axiosClient.get<Book[]>("/books");
  return response.data;
};

export const getBook = async (isbn: string): Promise<Book | false> => {
  try {
    const response = await axiosClient.get<Book>("/book", {
      params: { isbn },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return false;
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

export const deleteBook = async (isbn: string): Promise<void> => {
  await axiosClient.delete("/book", {
    params: { isbn },
    withCredentials: true,
  });
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
