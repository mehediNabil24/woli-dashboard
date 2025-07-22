import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard";
import SignInPage from "../components/pages/auth/SignIn";
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
import DealListPage from "../components/dealList/DealList";
import AddDealPage from "../components/dealList/AddDeal";
import DealRequestPage from "../components/dealList/DealRequest";
import ReportAdmin from "../components/report/ReportAdmin";
import LevelPage from "../components/level/Level";
import ClosersPage from "../components/closers/Closers";
import AgentListPage from "../components/agent/Agent";
// import AgentDetailsPage from "../components/agent/AgentDeatils";


// ⬇️ Import TokenHandler


const RouterProvider: React.FC = () => {
  return (
    <Router>
      {/* ⬇️ Wrap all Routes inside TokenHandler */}

      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/agent-request" element={<AgentRequest />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verification-code" element={<VerificationCode />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />

          {/* ADMIN ROLE ROUTES */}
          {/* element={<PrivateRoute allowedRoles={["ADMIN"]} />} */}
          <Route >
            <Route path="/admin" element={<DashboardLayout navLink={AdminNavLink} />}>
              <Route index element={<AdminDashboard />} />
              <Route path="individual" element={<IndividualPl />} />

              <Route path="individual/:id" element={<UnderConstruction name="this" />} />
              <Route path="agent" element={<AgentListPage />} />
              {/* <Route path="agent/:id" element={<UnderConstruction name='this' />} /> */}

              <Route path="add-deal" element={<AddDealPage />} />
              <Route path="deal-list" element={<DealListPage />} />
              <Route path="product-list/:id" element={<UnderConstruction name="this" />} />
              <Route path="deal-request" element={<DealRequestPage />} />
              <Route path="report" element={<ReportAdmin />} />
              <Route path="level" element={<LevelPage />} />
              <Route path="closers" element={<ClosersPage />} />
              <Route path="add-blog" element={<UnderConstruction name='this' />} />
              <Route path="all-blog" element={<UnderConstruction name='this' />} />
              <Route path="blog-details" element={<UnderConstruction name='this' />} />
              <Route path="reviews" element={<UnderConstruction name='this' />} />
              <Route path="admin-profile" element={<AdminProfile />} />
              <Route path="password" element={<AdminPasswordChange />} />
              
            </Route>
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
