import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  FormControlLabel,
  Switch,
  ClickAwayListener,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    setOpen(true);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const mockItems = [
    "Book Item 1",
    "Book Item 2",
    "Book Item 3",
    "Book Item 4",
  ];

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{ position: "relative", width: "100%", maxWidth: 600 }}
        ref={anchorRef}
      >
        <TextField
          fullWidth
          placeholder="Search for books..."
          variant="outlined"
          onFocus={handleFocus}
          onChange={() => setOpen(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {open && (
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              mt: 1,
              zIndex: 10,
              maxHeight: 300,
              overflow: "auto",
            }}
            elevation={3}
          >
            <List>
              {mockItems.map((item, index) => (
                <ListItemButton onClick={() => navigate(`/book`)} key={index}>
                  <ListItemText primary={item} />
                </ListItemButton>
              ))}
            </List>
            <Box sx={{ p: 1, borderTop: "1px solid #eee" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showHistory}
                    onChange={(e) => setShowHistory(e.target.checked)}
                    size="small"
                  />
                }
                label="Display search history"
              />
            </Box>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};
