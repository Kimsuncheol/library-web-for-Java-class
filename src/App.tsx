import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { BookDetailPage } from "./pages/BookDetailPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { BorrowReturnHistoryPage } from "./pages/admin/BorrowReturnHistoryPage";
import { BookManagementPage } from "./components/books/BookManagementPage";
import { Header } from "./components/layout/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/book" element={<BookDetailPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<BookManagementPage />} />
        <Route path="/admin/history" element={<BorrowReturnHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
