// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import ImageDetail from "./page/ImageDetail";
import AuthorPage from "./page/AuthorPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/image/:id" element={<ImageDetail />} />
        <Route path="/author/:authorParam" element={<AuthorPage />} />

      </Routes>
    </Router>
  );
}
