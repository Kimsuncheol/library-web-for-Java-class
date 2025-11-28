import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  useTheme,
} from "@mui/material";

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddBookModal: React.FC<AddBookModalProps> = ({
  open,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Adding book:", formData);
    onClose();
  };
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adding Book</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            name="title"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            label="Author Name"
            name="author"
            variant="outlined"
            fullWidth
            value={formData.author}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            label="ISBN"
            name="isbn"
            variant="outlined"
            fullWidth
            value={formData.isbn}
            onChange={handleChange}
          />

          {/* Image Upload UI Hint */}
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              bgcolor: theme.palette.background.paper,
              cursor: "pointer",
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              Drag & Drop Image Here
            </Typography>
            <Typography variant="caption" color="text.secondary">
              (Implementation target: React-DnD)
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
