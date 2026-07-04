import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Books from "../pages/Books/Books";
import BookDetails from "../pages/BookDetails/BookDetails";

import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Checkout from "../pages/Checkout/Checkout";
import Orders from "../pages/Orders/Orders";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";

import Dashboard from "../pages/Admin/Dashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageBooks from "../pages/Admin/ManageBooks";
import ManageOrders from "../pages/Admin/ManageOrders";
import ManageUsers from "../pages/Admin/ManageUsers";

import ProtectedRoute from "../components/routes/ProtectedRoute";
import AdminRoute from "../components/routes/AdminRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          {/* Public Routes */}

          <Route path="/" element={<Home />} />

          <Route path="/books" element={<Books />} />

          <Route
            path="/books/:id"
            element={<BookDetails />}
          />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/books"
            element={
              <AdminRoute>
                <ManageBooks />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <ManageOrders />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;