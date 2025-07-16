import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard";
import SignInPage from "../components/pages/signIn/SignIn";
import AdminDashboard from "../components/pages/adminDashboard/AdminDashBoard";
import { AdminNavLink, navLink } from "../components/layouts/Navlink";
import PrivateRoute from "./PrivateRoute";


import AdminProfile from "../components/admin/AdminProfile";


import UserProfile from "../components/userProfile/UserProfile";
import PasswordChange from "../components/password/UserPassword";
import AdminPasswordChange from "../components/password/adminPassword";


import UnderConstruction from "../components/others/underConstructions";

// ⬇️ Import TokenHandler


const RouterProvider: React.FC = () => {
  return (
    <Router>
      {/* ⬇️ Wrap all Routes inside TokenHandler */}
 
        <Routes>
          <Route path="/" element={<SignInPage />} />

          {/* USER ROLE ROUTES */}
          <Route element={<PrivateRoute allowedRoles={["USER"]} />}>
            <Route path="/dashboard" element={<DashboardLayout navLink={navLink} />}>
              <Route index element={<UserProfile />} />
              <Route path="order-list" element={<UnderConstruction name='string' />} />
              <Route path="order-list/:id" element={<UnderConstruction name='string' />} />
              <Route path="password" element={<PasswordChange />} />
              <Route path="my-service" element={<UnderConstruction name='string' />} />
            </Route>
          </Route>

          {/* ADMIN ROLE ROUTES */}
          <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<DashboardLayout navLink={AdminNavLink} />}>
              <Route index element={<AdminDashboard />} />
              <Route path="add-category" element={<UnderConstruction name="this" />} />
              <Route path="category-list" element={<UnderConstruction name="this" />} />
              <Route path="add-product" element={<UnderConstruction name="this" />} />
              <Route path="product-list" element={<UnderConstruction name="this" />} />
              <Route path="product-list/:id" element={<UnderConstruction name="this" />} />
              <Route path="add-material" element={<UnderConstruction name='this' />} />
              <Route path="material-list" element={<UnderConstruction name='this' />} />
              <Route path="customer-list" element={<UnderConstruction name='this' />} />
              <Route path="order-list" element={<UnderConstruction name='this' />} />
              <Route path="add-blog" element={<UnderConstruction name='this' />} />
              <Route path="all-blog" element={<UnderConstruction name='this' />} />
              <Route path="blog-details" element={<UnderConstruction name='this' />} />
              <Route path="reviews" element={<UnderConstruction name='this' />} />
              <Route path="admin-profile" element={<AdminProfile />} />
              <Route path="password" element={<AdminPasswordChange />} />
              
            </Route>
          </Route>
        </Routes>
     
    </Router>
  );
};

export default RouterProvider;
