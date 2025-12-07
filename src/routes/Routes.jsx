import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import AddService from "../pages/AddService";
import MyServices from "../pages/MyServices";
import UpdateService from "../pages/UpdateService";
import MyBookings from "../pages/MyBookings";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetails />} />

          {/* Private Routes */}
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="add-service"
            element={
              <PrivateRoute>
                <AddService />
              </PrivateRoute>
            }
          />
          <Route
            path="my-services"
            element={
              <PrivateRoute>
                <MyServices />
              </PrivateRoute>
            }
          />
          <Route
            path="update-service/:id"
            element={
              <PrivateRoute>
                <UpdateService />
              </PrivateRoute>
            }
          />
          <Route
            path="my-bookings"
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;