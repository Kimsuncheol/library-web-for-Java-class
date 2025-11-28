import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { BookDetailPage } from "./pages/BookDetailPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { BookHistoryPage } from "./pages/admin/BookHistoryPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/book" element={<BookDetailPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/history" element={<BookHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
