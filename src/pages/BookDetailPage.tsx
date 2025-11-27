import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Rating,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Header } from "../components/layout/Header";
import { getBook, borrowBook, returnBook } from "../api/bookService";
import { Book } from "../types/book";

export const BookDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isbn = searchParams.get("isbn");
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      if (!isbn) {
        setError("No ISBN provided");
        setLoading(false);
        return;
      }
      const data = await getBook(isbn);
      if (data) {
        setBook(data);
      } else {
        setError("Book not found");
      }
      setLoading(false);
    };
    fetchBook();
  }, [isbn]);

  const handleBorrow = async () => {
    if (!book) return;
    setSuccessMessage("");
    setError("");
    const success = await borrowBook(book.isbn);
    if (success) {
      setSuccessMessage("Book borrowed successfully!");
    } else {
      setError("Failed to borrow book. It might be unavailable.");
    }
  };

  const handleReturn = async () => {
    if (!book) return;
    setSuccessMessage("");
    setError("");
    const success = await returnBook(book.isbn);
    if (success) {
      setSuccessMessage("Book returned successfully!");
    } else {
      setError("Failed to return book.");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 4,
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  if (error && !book) {
    return (
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {book && (
          <Grid container spacing={4}>
            {/* Left Column: Image */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  width: "100%",
                  paddingTop: "133%", // 3:4 aspect ratio
                  backgroundColor: "#e0e0e0",
                  position: "relative",
                  borderRadius: 2,
                }}
              >
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "text.secondary",
                    }}
                  >
                    No Image
                  </Typography>
                )}
              </Box>
            </Grid>

            {/* Right Column: Details */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                <Typography variant="h3" component="h1">
                  {book.title}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  by {book.author}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating value={4} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    (4.0)
                  </Typography>
                </Stack>

                <Typography variant="body1" paragraph>
                  {book.description}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  ISBN: {book.isbn}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        )}

        {/* Bottom Section: Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleBorrow}
            sx={{ py: 2, fontSize: "1.2rem" }}
          >
            BORROW
          </Button>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={handleReturn}
            sx={{ py: 2, fontSize: "1.2rem" }}
          >
            RETURN
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
