import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import ScrollToTop from "./utils/ScrollToTop";
import SellerSettings from "./components/Dashboard/SellerDashboard/SellerSettings";

const Applayout = lazy(() => import("./pages/Applayout"));
const Home = lazy(() => import("./pages/Home"));
const Reviews = lazy(() => import("./pages/Reviews"));
const TourPackages = lazy(() => import("./pages/TourPackages"));
const MyCart = lazy(() => import("./pages/MyCart"));
const DashboardLayout = lazy(() => import("./pages/Dashboards/DashboardLayout"));
const SellerHome = lazy(() => import("./components/Dashboard/SellerDashboard/SellerHome"));
const MyPackages = lazy(() => import("./components/Dashboard/SellerDashboard/MyPackages"));
const Orders = lazy(() => import("./components/Dashboard/SellerDashboard/Orders"));
const Payments = lazy(() => import("./components/Dashboard/SellerDashboard/Payments"));
const AddOrUpdatePackage = lazy(() => import("./pages/Dashboards/AddOrUpdatePackage"));
const AdminLayout = lazy(() => import("./pages/AdminDashboard/AdminLayout"));
const AdminHome = lazy(() => import("./components/Dashboard/AdminPanel/AdminHome"));
const Sellers = lazy(() => import("./components/Dashboard/AdminPanel/Sellers"));
const Requests = lazy(() => import("./components/Dashboard/AdminPanel/Requests"));
const RejectedPackages = lazy(() => import("./components/Dashboard/AdminPanel/RejectedPackages"));
const ApprovedPackages = lazy(() => import("./components/Dashboard/AdminPanel/ApprovedPackages"));
const Edits = lazy(() => import("./components/Dashboard/AdminPanel/Edits"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const PackageDetail = lazy(() => import("./pages/PackageDetail"));
const EditProfile = lazy(() => import("./components/Dashboard/Profile/EditProfile"));
const CompletedTrips = lazy(() => import("./components/Dashboard/Profile/CompletedTrips"));
const UpcomingTrips = lazy(() => import("./components/Dashboard/Profile/UpcomingTrips"));

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Applayout />}>
              <Route index element={<Home />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="tour-packages" element={<TourPackages />} />
              <Route path="tour-package/:id" element={<PackageDetail />} />
              <Route path="cart" element={<MyCart />} />
            </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />

            <Route path="/seller-dashboard" element={<DashboardLayout />}>
              <Route index element={<SellerHome />} />
              <Route path="packages" element={<MyPackages />} />
              <Route path="packages/modify-package/:id" element={<AddOrUpdatePackage />} />
              <Route path="packages/add-package" element={<AddOrUpdatePackage />} />
              <Route path="orders" element={<Orders />} />
              <Route path="payments" element={<Payments />} />
              <Route path="seller-settings" element={<SellerSettings/>}/>
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
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
