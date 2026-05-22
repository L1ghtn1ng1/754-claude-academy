import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
