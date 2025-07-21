import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard";
import SignInPage from "../components/pages/auth/signIn/SignIn";
import AdminDashboard from "../components/pages/adminDashboard/AdminDashBoard";
import { AdminNavLink, navLink } from "../components/layouts/Navlink";



import AdminProfile from "../components/admin/AdminProfile";


import AdminPasswordChange from "../components/password/adminPassword";


import UnderConstruction from "../components/others/underConstructions";

import AgentRankingList from "../components/agentDashboard/scoreBoard/Scorebaord";

import AddDeal from "../components/agentDashboard/addDeal/AddDeal";
import PendingDeal from "../components/agentDashboard/pendingDeal/PendaingDeal";
import ProfilePage from "../components/agentDashboard/agentProfile/AgentProfile";
import ReportPage from "../components/agentDashboard/report/Report";
import IndividualPl from "../components/individualPL/IndividualPl";
import AgentRequest from "../components/pages/auth/AgentRequest";

// ⬇️ Import TokenHandler


const RouterProvider: React.FC = () => {
  return (
    <Router>
      {/* ⬇️ Wrap all Routes inside TokenHandler */}

      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/agentRequest" element={<AgentRequest />} />

        {/* USER ROLE ROUTES */}
        {/* element={<PrivateRoute allowedRoles={["USER"]} />} */}
        <Route >
          <Route path="/dashboard" element={<DashboardLayout navLink={navLink} />}>
            <Route index element={<ReportPage />} />


            <Route path="scoreboard" element={<AgentRankingList />} />
            <Route path="addDeal" element={<AddDeal />} />
            <Route path="pendingDeal" element={<PendingDeal />} />

            <Route path="profile" element={<ProfilePage />} />
            <Route path="my-service" element={<UnderConstruction name='string' />} />
          </Route>
        </Route>

        {/* ADMIN ROLE ROUTES */}
        {/* element={<PrivateRoute allowedRoles={["ADMIN"]} />} */}
        <Route >
          <Route path="/admin" element={<DashboardLayout navLink={AdminNavLink} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="individual" element={<IndividualPl />} />
            <Route path="individual/:id" element={<UnderConstruction name="this" />} />
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
