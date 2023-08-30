/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Index from "layouts/authentication/index";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TaskIcon from "@mui/icons-material/Task";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ResetPassword from "layouts/authentication/reset-password/cover";
import KeyIcon from "@mui/icons-material/Key";
import ResetPasswordByEmail from "./layouts/authentication/reset-password-by-email";

// @mui icons
import Icon from "@mui/material/Icon";
import Logout from "./layouts/authentication/logout";
import PeopleIcon from "@mui/icons-material/People";
import Customer from "./layouts/customer";
import CustomerDetail from "./layouts/customerDetail";
import Task from "./layouts/task";
import TaskDetail from "./layouts/taskDetail";
import Product from "./layouts/product";
import ProductDetail from "./layouts/productDetail";
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import RankList from "./layouts/rankList";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CustomerPublicPool from "./layouts/customerPublicPool";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "hide",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "hide",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "hide",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "hide",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "hide",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "hide",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "hide",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "hide",
    name: "Home",
    key: "home",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/",
    component: <Index />,
  },
  {
    type: "hide",
    name: "Clue Manage",
    key: "clue",
    icon: <TipsAndUpdatesIcon fontSize="small" />,
    route: "/clue",
    component: null,
  },
  {
    type: "collapse",
    name: "Customer",
    key: "customer",
    icon: <PeopleIcon fontSize="small" />,
    route: "/customer",
    component: <Customer />,
  },
  {
    type: "collapse",
    name: "Customer Public Pool",
    key: "customer-public-pool",
    icon: <CloudCircleIcon fontSize="small" />,
    route: "customer-public-pool",
    component: <CustomerPublicPool />
  },
  {
    type: "collapse",
    name: "Product",
    key: "product",
    icon: <ShoppingBagIcon fontSize="small" />,
    route: "/product",
    component: <Product />,
  },
  {
    type: "collapse",
    name: "Task Manage",
    key: "task",
    icon: <TaskIcon fontSize="small" />,
    route: "/task",
    component: <Task />,
  },

  {
    type: "hide",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <Logout />,
  },
  {
    type: "hide",
    name: "detail",
    key: "detail",
    icon: null,
    route: "detail",
    component: <CustomerDetail />,
  },
  {
    type: "hide",
    name: "task-detail",
    key: "task-detail",
    icon: null,
    route: "task-detail",
    component: <TaskDetail />,
  },
  {
    type: "hide",
    name: "product-detail",
    key: "product-detail",
    icon: null,
    route: "product-detail",
    component: <ProductDetail />,
  },
  {
    type: "collapse",
    name: "Rank List",
    key: "rank-list",
    icon: <EmojiEventsIcon fontSize="small" />,
    route: "rank-list",
    component: <RankList />
  },
  {
    type: "hide",
    name: "Reset Password",
    key: "reset",
    icon: <KeyIcon fontSize="small" />,
    route: "/reset-email",
    component: <ResetPasswordByEmail />,
  },
  {
    type: "collapse",
    name: "Reset Password",
    key: "reset",
    icon: <KeyIcon fontSize="small" />,
    route: "/reset",
    component: <ResetPassword />,
  },
];

export default routes;
