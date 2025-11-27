import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  Link,
} from "@mui/material";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onLogin,
  onSwitchToSignup,
}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Simulate login logic
    if (id && password) {
      onLogin();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Sign In</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="ID"
            variant="outlined"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                onClose();
                onSwitchToSignup();
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
};
