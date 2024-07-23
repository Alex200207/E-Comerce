import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/ProtectedRoutes";
import Login from "./components/AuthPages/Login";
import AdminPage from "./Pages/AdminPage";

import TableCategorias from "@components/Dashboard/TableCategorias";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/adminPage" element={<AdminPage />}>
          <Route path="productos" element={<span>ddd</span>} />
          <Route path="categorias" element={<TableCategorias searchTerm={""}/>} />
          {/* Agrega otras rutas hijas aquí */}
        </Route>
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
