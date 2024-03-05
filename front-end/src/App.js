import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Thanks from "./pages/Thanks";
import Ticket from "./pages/Ticket";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/thanks" element={<Thanks />} />
      <Route path="/ticket" element={<Ticket />} />
    </Routes>
  );
}
