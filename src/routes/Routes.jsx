import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* More routes will be added in next commits */}
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;