import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//importing other components
import Resetpassword from "../components/auth/resetPassword";
import Dashboard from "./dashboard";
import Login from "./login";
import Signup from "./signup";
import Forgotpassword from "./forgotpassword";
import Toast from "../components/common/toaster";
import Profile from "./profile";
import Bookings from "./bookings";
import Orders from "./orders";
import Wishlist from "./wishlist";
import Property from "./property";
import ChangePassword from "./changePassword";
import NotFound from "./notFound";
import Fallback from "./fallback";
const PropertyDetails = React.lazy(() => import("./propertyDetails"));
const MyProperties = React.lazy(() => import("./myProperties"));

const AllPages = () => {
  // const NotFoundRedirect = () => <Redirect to='/not-found' />
  return (
    <>
      <Toast />

      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/property-details/:id" element={<PropertyDetails/>}/>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/details/:id" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route
              exact
              path="/resetpassword/:token"
              element={<Resetpassword />}
            />
            <Route exact path="/forgotPassword" element={<Forgotpassword />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/update/password" element={<ChangePassword />} />
            <Route exact path="/bookings" element={<Bookings />} />
            <Route exact path="/orders" element={<Orders />} />
            <Route exact path="/wishlist" element={<Wishlist />} />
            <Route exact path="/properties" element={<MyProperties />} />
            <Route exact path="/property/:id" element={<Property />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default AllPages;
