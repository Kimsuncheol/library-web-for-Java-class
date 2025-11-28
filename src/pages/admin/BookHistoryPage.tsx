import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { getHistoriesAPI } from "../../api/bookService";
import { History } from "../../types/book";

export const BookHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [histories, setHistories] = useState<History[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const data = await getHistoriesAPI();
        setHistories(data);
      } catch (err) {
        setError("Failed to fetch book history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, []);

  const handleBackClick = () => {
    navigate("/admin");
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <IconButton onClick={handleBackClick} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Book History
        </Typography>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }} aria-label="book history table">
          <TableHead sx={{ bgcolor: "grey.800" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Book Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                User Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {histories.map((history) => (
              <TableRow
                key={history.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {history.id}
                </TableCell>
                <TableCell>{history.book.title}</TableCell>
                <TableCell>User</TableCell> {/* Placeholder for User Name */}
                <TableCell>
                  <Chip
                    label={
                      history.content.includes("Borrowed")
                        ? "Borrowed"
                        : "Returned"
                    }
                    color={
                      history.content.includes("Borrowed")
                        ? "primary"
                        : "success"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(history.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
