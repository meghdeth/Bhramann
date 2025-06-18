import { BrowserRouter, Route, Routes } from "react-router-dom";
import Applayout from "./pages/Applayout";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import TourPackages from "./pages/TourPackages";
import MyCart from "./pages/MyCart";
import DashboardLayout from "./pages/Dashboards/DashboardLayout";
import SellerHome from "./components/Dashboard/SellerDashboard/SellerHome";
import MyPackages from "./components/Dashboard/SellerDashboard/MyPackages";
import Orders from "./components/Dashboard/SellerDashboard/Orders";
import Payments from "./components/Dashboard/SellerDashboard/Payments";
import AddOrUpdatePackage from "./pages/Dashboards/AddOrUpdatePackage";
import AdminLayout from "./pages/AdminDashboard/AdminLayout";
import AdminHome from "./components/Dashboard/AdminPanel/AdminHome";
import Sellers from "./components/Dashboard/AdminPanel/Sellers";
import Requests from "./components/Dashboard/AdminPanel/Requests";
import RejectedPackages from "./components/Dashboard/AdminPanel/RejectedPackages";
import ApprovedPackages from "./components/Dashboard/AdminPanel/ApprovedPackages";
import Edits from "./components/Dashboard/AdminPanel/Edits";
import ScrollToTop from "./utils/ScrollToTop";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import PackageDetail from "./pages/PackageDetail";
import EditProfile from "./components/Dashboard/Profile/EditProfile";
import CompletedTrips from "./components/Dashboard/Profile/CompletedTrips";
import UpcomingTrips from "./components/Dashboard/Profile/UpcomingTrips";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Applayout />}>
            <Route index element={<Home />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="tour-packages" element={<TourPackages />} />
            <Route path="tour-package/:id" element={<PackageDetail />} />
            <Route path="cart" element={<MyCart />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="/seller-dashboard" element={<DashboardLayout />}>
            <Route index element={<SellerHome />} />
            <Route path="packages" element={<MyPackages />} />
            <Route path="packages/modify-package/:id" element={<AddOrUpdatePackage />} />
            <Route path="packages/add-package" element={<AddOrUpdatePackage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="payments" element={<Payments />} />
          </Route>

          <Route path="/edit-profile" element={<EditProfile />}/>
          <Route path="/completed-trips" element={<CompletedTrips />}/>
          <Route path="/upcoming-trips" element={<UpcomingTrips />}/>

          <Route path="/superadmin-panel" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="requests" element={<Requests />} />
            <Route path="edits" element={<Edits />} />
            <Route path="requests/rejected" element={<RejectedPackages />} />
            <Route path="requests/approved" element={<ApprovedPackages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
