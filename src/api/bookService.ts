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
    });
    return response.data;
  } catch (error) {
    // Assuming 404 or similar means not found, but requirement says "Returns: Book object OR false (boolean) if not found."
    // If the API actually returns boolean false on 200 OK for not found, the above works.
    // If it returns 404, we might need to catch it.
    // Given the requirement "Returns: Book object OR false (boolean) if not found", let's assume the API might return false directly or we handle error.
    // However, usually APIs return 404. Let's assume if it throws, we return false.
    return false;
  }
};

export const addBook = async (
  book: Omit<Book, "coverImage">
): Promise<boolean> => {
  try {
    const response = await axiosClient.post<boolean>("/book", book);
    return response.data;
  } catch (error) {
    return false;
  }
};

export const deleteBook = async (isbn: string): Promise<void> => {
  await axiosClient.delete("/book", { params: { isbn } });
};

export const borrowBook = async (isbn: string): Promise<boolean> => {
  try {
    const response = await axiosClient.post<boolean>("/borrow", { isbn });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const returnBook = async (isbn: string): Promise<boolean> => {
  try {
    const response = await axiosClient.post<boolean>("/return", { isbn });
    return response.data;
  } catch (error) {
    return false;
  }
};
