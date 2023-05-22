import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Conversation Viewer",
    layout: "/admin",
    path: "default",
    component: <MainDashboard />,
  },
  {
    name: "Chat Engagement",
    layout: "/admin",
    path: "nft-marketplace",
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Chat Conversation",
    layout: "/admin",
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Chat Rating",
    layout: "/admin",
    path: "profile",
    component: <Profile />,
  },
  {
    name: "Leads/1000 Visitors",
    layout: "/auth",
    path: "sign-in",
    component: <SignIn />,
  },
  {
    name: "Time to Answer",
    layout: "/rtl",
    path: "rtl",
    component: <RTLDefault />,
  },
  {
    name: "Turns/Chat",
    layout: "/rtl",
    path: "rtl",
    component: <RTLDefault />,
  },
];
export default routes;
