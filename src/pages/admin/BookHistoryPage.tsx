import React from "react";
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
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

// Mock Data
const historyRows = [
  {
    id: 1,
    title: "The Great Gatsby",
    user: "John Doe",
    status: "Borrowed",
    date: "2025-11-20",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    user: "Jane Smith",
    status: "Returned",
    date: "2025-11-22",
  },
  {
    id: 3,
    title: "1984",
    user: "Alice Johnson",
    status: "Borrowed",
    date: "2025-11-25",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    user: "Bob Brown",
    status: "Returned",
    date: "2025-11-26",
  },
  {
    id: 5,
    title: "Moby Dick",
    user: "Charlie Davis",
    status: "Borrowed",
    date: "2025-11-28",
  },
];

export const BookHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <IconButton onClick={() => navigate("/admin")} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Book History
        </Typography>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }} aria-label="book history table">
          <TableHead sx={{ bgcolor: "grey.100" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Book Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === "Borrowed" ? "primary" : "success"}
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: "bold" }}
                  />
                </TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
