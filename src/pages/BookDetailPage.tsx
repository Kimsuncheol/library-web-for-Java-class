import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Rating,
  Button,
  Stack,
} from "@mui/material";
import { Header } from "../components/layout/Header";

export const BookDetailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bookName = searchParams.get("name") || "Unknown Book";

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
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
                Book Image
              </Typography>
            </Box>
          </Grid>

          {/* Right Column: Details */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={2}>
              <Typography variant="h3" component="h1">
                {bookName}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating value={4} readOnly />
                <Typography variant="body2" color="text.secondary">
                  (4.0)
                </Typography>
              </Stack>

              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section: Borrow Button */}
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ py: 2, fontSize: "1.2rem" }}
          >
            BORROW
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
