import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import PetDetail from "./pages/PetDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ReleasePet from "./pages/ReleasePet";
import AdoptPet from "./pages/AdoptPet";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/release" element={<ReleasePet />} />
        <Route
          path="/adopt/:id"
          element={<ProtectedRoute><AdoptPet /></ProtectedRoute>}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
