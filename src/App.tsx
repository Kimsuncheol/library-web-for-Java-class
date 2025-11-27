import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { BookDetailPage } from "./pages/BookDetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/book" element={<BookDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
