import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard";

import AdminDashboard from "../components/pages/adminDashboard/AdminDashBoard";
import { AdminNavLink, navLink } from "../components/layouts/Navlink";



import AdminProfile from "../components/admin/AdminProfile";


import AdminPasswordChange from "../components/password/adminPassword";


import UnderConstruction from "../components/others/underConstructions";



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
import SignInPage from "../components/pages/auth/SignIn";
import ScoreBoard from "../components/agentDashboard/scoreBoard/Scorebaord";
import SalesPage from "../components/sales/Sales";
import AdminScoreBoard from "../components/adminScoreBoard/AdminScoreboard";



// ⬇️ Import TokenHandler


const RouterProvider: React.FC = () => {
  return (
    <Router>
      {/* ⬇️ Wrap all Routes inside TokenHandler */}
 
        <Routes>
          <Route path="/" element={<SignInPage />} />

          {/* USER ROLE ROUTES */}
          {/* element={<PrivateRoute allowedRoles={["USER"]} />} */}
          <Route >
            <Route path="/dashboard" element={<DashboardLayout navLink={navLink} />}>
             <Route index element={<ReportPage />} />
              
              
              <Route path="scoreboard" element={<ScoreBoard />} />
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

              {/* <Route path="individual/:id" element={<UnderConstruction name="this" />} /> */}
              <Route path="agent" element={<AgentListPage />} />
              {/* <Route path="agent/:id" element={<UnderConstruction name='this' />} /> */}

              <Route path="add-deal" element={<AddDealPage />} />
              <Route path="deal-list" element={<DealListPage />} />
              {/* <Route path="product-list/:id" element={<UnderConstruction name="this" />} /> */}
              <Route path="deal-request" element={<DealRequestPage />} />
              <Route path="report" element={<ReportAdmin />} />
              <Route path="level" element={<LevelPage />} />
              <Route path="closers" element={<ClosersPage />} />
              <Route path="scoreboard" element={<AdminScoreBoard />} />
              <Route path="sales" element={<SalesPage />} />
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
