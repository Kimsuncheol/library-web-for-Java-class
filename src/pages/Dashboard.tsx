import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { Header } from "../components/layout/Header";
import { SearchBar } from "../components/search/SearchBar";

export const Dashboard: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 10,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          Library Search
        </Typography>
        <SearchBar />
      </Container>
    </Box>
  );
};
