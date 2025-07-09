import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import ScrollToTop from "./utils/ScrollToTop";
import SellerSettings from "./pages/Dashboards/Settings";
import { isAuthenticated } from "./auth";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import UserDashboard from './components/Dashboard/UserDashboard/UserHome';
import UserBookings from "./components/Dashboard/UserDashboard/UserBookings";
import VerifyStudent from "./components/Dashboard/UserDashboard/VerifyStudent";

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
const CompletedTrips = lazy(() => import("./components/Dashboard/UserDashboard/CompletedTrips"));
const UpcomingTrips = lazy(() => import("./components/Dashboard/UserDashboard/UpcomingTrips"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const FlightsSearchResults = lazy(() => import("./pages/FlightsSearchResults"));
const HostelsSearchResults = lazy(() => import("./pages/HostelsSearchResults"));
const BusesSearchResults = lazy(() => import("./pages/BusesSearchResults"));

// PrivateRoute component
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

// PublicRoute component (for pages like login/signup)
function PublicRoute({ children }) {
  return !isAuthenticated() ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div className="flex h-[100vh] w-full items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Applayout />}>
              <Route index element={<Home />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="tour-packages" element={<TourPackages />} />
              <Route path="tour-package/:id" element={<PackageDetail />} />
              <Route path="cart" element={<MyCart />} />
            </Route>
            <Route path="flights/search" element={<FlightsSearchResults />} />
            <Route path="hostels/search" element={<HostelsSearchResults />} />
            <Route path="buses/search" element={<BusesSearchResults />} />
            <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="verify-email" element={<VerifyEmail />} />
            <Route path="reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />

            <Route path="/seller-dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route index element={<SellerHome />} />
              <Route path="packages" element={<MyPackages />} />
              <Route path="packages/modify-package/:id" element={<AddOrUpdatePackage />} />
              <Route path="packages/add-package" element={<AddOrUpdatePackage />} />
              <Route path="orders" element={<Orders />} />
              <Route path="payments" element={<Payments />} />
              <Route path="settings" element={<SellerSettings />} />
            </Route>


            <Route path="/superadmin-panel" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
              <Route index element={<AdminHome />} />
              <Route path="sellers" element={<Sellers />} />
              <Route path="requests" element={<Requests />} />
              <Route path="edits" element={<Edits />} />
              <Route path="requests/rejected" element={<RejectedPackages />} />
              <Route path="requests/approved" element={<ApprovedPackages />} />
            </Route>

            <Route path="/user-dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route index element={<UserDashboard />} />
            <Route path="bookings" element={<UserBookings />} />
            <Route path="verify-student" element={<VerifyStudent />} />
            <Route path="settings" element={<SellerSettings />} />

            <Route path="completed-trips" element={<CompletedTrips />} />
            <Route path="upcoming-trips" element={<UpcomingTrips />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
