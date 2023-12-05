import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useValidateToken } from "./hooks/useValidateToken";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FallBack from "./components/FallBack";
import SingleOrder from "./Pages/Managment/Staff/Order/SingleOrder";

//pages
const Register = React.lazy(() => import("./Pages/SignUp/Register"));
const Login = React.lazy(() => import("./Pages/SingIn/Login"));
const ForgotPassword = React.lazy(() => import("./Pages/resetpassword/Index"));
const Cart = React.lazy(() => import("./Pages/Cart/Cart"));
const MealHistory = React.lazy(() => import("./Pages/Mealhistory/MealHistory"));
const OrderDetails = React.lazy(() =>
  import("./Pages/Mealhistory/OrderedFoodDetails/App")
);
const Profile = React.lazy(() => import("./Pages/Profile/Profile"));
const HomeApp = React.lazy(() => import("./Pages/Home/Home"));
const ChangePassword = React.lazy(() =>
  import("./Pages/Profile/changePassword/ChangePassword")
);

const AddNewItem = React.lazy(() =>
  import("./Pages/Managment/Staff/updateItems/addNewFood/AddNewItem")
);
const Orders = React.lazy(() =>
  import("./Pages/Managment/Staff/orders/Orders")
);
const StaffSingleOrder = React.lazy(() =>
  import("./Pages/Managment/Staff/Order/SingleOrder")
);
const Admin = React.lazy(() =>
  import("./Pages/Managment/Admin/tableStats/Admin")
);
const AllUsers = React.lazy(() =>
  import("./Pages/Managment/Admin/Admins/users/Index")
);
const SingleUser = React.lazy(() =>
  import("./Pages/Managment/Admin/Admins/user/Index")
);

const PreMeasuredQuantities = React.lazy(() =>
  import("./Pages/Managment/Admin/preMeasuredQuantity/PreMeasured")
);
const UpdateItems = React.lazy(() =>
  import("./Pages/Managment/Staff/updateItems/updateExistingFood/UpdateItems")
);
const UpdateOneItem = React.lazy(() =>
  import(
    "./Pages/Managment/Staff/updateItems/updateExistingFood/UpdateExistingFood"
  )
);
const Transactions = React.lazy(() =>
  import("./Pages/Managment/CustomerCare/transactions/Transactions")
);

function App() {
  useValidateToken();

  return (
    <Suspense fallback={<FallBack />}>
      <ToastContainer style={{ width: "fit-content" }} />
      <SkeletonTheme baseColor="#192433" highlightColor="#23313d">
        <Routes>
          {/* ...public routes */}
          <Route path="/" element={<HomeApp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          {/* protected routes */}
          <Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/mealhistory">
              <Route index element={<MealHistory />} />
              <Route path=":id" element={<OrderDetails />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/customercare" element={<Transactions />} />
            <Route path="/staff">
              <Route index element={<UpdateItems />} />
              <Route path="orders" element={<Orders />} />
              <Route path="order/:id" element={<StaffSingleOrder />} />
              <Route path="addnewitem" element={<AddNewItem />} />
              <Route path="item/:id" element={<UpdateOneItem />} />
            </Route>
            <Route path="/admin">
              <Route index element={<Admin />} />
              <Route path="users">
                <Route index element={<AllUsers />} />
                <Route path=":id" element={<SingleUser />} />
              </Route>

              <Route
                path="measuredquantities"
                element={<PreMeasuredQuantities />}
              />
            </Route>
          </Route>

          {/* catch all */}
        </Routes>
      </SkeletonTheme>
    </Suspense>
  );
}

export default App;
