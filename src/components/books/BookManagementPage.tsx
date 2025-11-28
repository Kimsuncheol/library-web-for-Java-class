import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Stack,
  Chip,
  Alert,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getBooks, deleteBook } from "../../api/bookService";
import { Book } from "../../types/book";
import { AddBookModal } from "./AddBookModal";

export const BookManagementPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIsbns, setSelectedIsbns] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleToggleDeleteMode = () => {
    setIsDeleteMode((prev) => !prev);
    setSelectedIsbns([]); // Clear selection when toggling
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIsbns(books.map((book) => book.isbn));
    } else {
      setSelectedIsbns([]);
    }
  };

  const handleSelectOne = (isbn: string) => {
    setSelectedIsbns((prev) =>
      prev.includes(isbn) ? prev.filter((id) => id !== isbn) : [...prev, isbn]
    );
  };

  const handleDelete = async () => {
    if (selectedIsbns.length === 0) return;

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIsbns.length} book(s)?`
      )
    ) {
      return;
    }

    try {
      await Promise.all(selectedIsbns.map((isbn) => deleteBook(isbn)));
      setNotification({
        open: true,
        message: "Books deleted successfully",
        severity: "success",
      });
      setIsDeleteMode(false);
      setSelectedIsbns([]);
      fetchBooks();
    } catch (error) {
      console.error("Failed to delete books", error);
      setNotification({
        open: true,
        message: "Failed to delete some books",
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" component="h1">
          Book Management
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            onClick={handleToggleDeleteMode}
            color={isDeleteMode ? "error" : "default"}
            aria-label="toggle delete mode"
          >
            {isDeleteMode ? <DeleteIcon /> : <DeleteOutlineIcon />}
          </IconButton>

          {isDeleteMode ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={selectedIsbns.length === 0}
            >
              Delete ({selectedIsbns.length})
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {isDeleteMode && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedIsbns.length > 0 &&
                      selectedIsbns.length < books.length
                    }
                    checked={
                      books.length > 0 && selectedIsbns.length === books.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
              )}
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => {
              const isSelected = selectedIsbns.includes(book.isbn);
              return (
                <TableRow
                  key={book.isbn}
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  selected={isSelected}
                >
                  {isDeleteMode && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelectOne(book.isbn)}
                      />
                    </TableCell>
                  )}
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>
                    <Chip
                      label="Available" // Assuming all fetched books are available for now as per type
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {books.length === 0 && (
              <TableRow>
                <TableCell colSpan={isDeleteMode ? 5 : 4} align="center">
                  No books found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Book Modal */}
      <AddBookModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          fetchBooks();
          setNotification({
            open: true,
            message: "Book added successfully",
            severity: "success",
          });
        }}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
