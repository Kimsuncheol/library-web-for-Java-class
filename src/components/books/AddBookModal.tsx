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
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { addBook } from "../../api/bookService";

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddBookModal: React.FC<AddBookModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setCoverImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log("Adding book:", { ...formData, coverImage });
    const success = await addBook(formData);
    if (success) {
      onSuccess();
      setFormData({
        title: "",
        author: "",
        description: "",
        isbn: "",
      });
      setCoverImage(null);
      onClose();
    }
  };

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
            {...getRootProps()}
            sx={{
              border: "2px dashed #ccc",
              borderColor: isDragActive ? "primary.main" : "#ccc",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              bgcolor: isDragActive ? "action.hover" : "background.paper",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "action.hover",
                borderColor: "primary.main",
              },
            }}
          >
            <input {...getInputProps()} />
            {coverImage ? (
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  Selected File:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {coverImage.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {(coverImage.size / 1024).toFixed(2)} KB
                </Typography>
              </Box>
            ) : (
              <>
                <Typography variant="body1" fontWeight="bold">
                  {isDragActive
                    ? "Drop the image here..."
                    : "Drag & Drop Image Here"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  or click to select a file
                </Typography>
              </>
            )}
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
