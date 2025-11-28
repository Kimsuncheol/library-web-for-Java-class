import React from "react";
import { Box, Typography, Card, CardContent, Stack } from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleBookManagementClick = () => {
    navigate("/admin/books");
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ mb: 6, fontWeight: "bold" }}
      >
        Admin Dashboard
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        justifyContent="center"
        sx={{ maxWidth: 800, width: "100%" }}
      >
        <Box sx={{ flex: 1 }}>
          <Card
            sx={{
              height: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
            onClick={handleBookManagementClick}
          >
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <MenuBookOutlinedIcon
                  sx={{ fontSize: 60, color: "primary.light" }}
                />
                <Typography variant="h5" component="div" align="center">
                  Book Management
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Card
            sx={{
              height: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
            onClick={() => navigate("/admin/history")}
          >
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <HistoryIcon sx={{ fontSize: 60, color: "secondary.main" }} />
                <Typography variant="h5" component="div" align="center">
                  Borrow/Return History
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
};
