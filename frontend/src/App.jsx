import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import InheritancePage from "./pages/InheritancePage";
import PolymorphismPage from "./pages/PolymorphismPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inheritance" replace />} />
        <Route path="/inheritance" element={<InheritancePage />} />
        <Route path="/polymorphism" element={<PolymorphismPage />} />
      </Routes>
    </BrowserRouter>
  );
}
