import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import ChatEngagement from "views/admin/chatengagement";
import ChatConversation from "views/admin/chatconversation";
import ChatRating from "views/admin/chatrating";
import TimetoAnswer from "views/admin/timetoanswer";
import TurnChat from "views/admin/turnchat";
import Leads from "views/admin/leads";
import Chat from "views/admin/chat";
import UserAccount from "views/admin/useraccount"
import UserList from "views/admin/useraccount/list"

//import Profile from "views/admin/profile";
//import DataTables from "views/admin/tables";
//import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";
import Forgot from "views/auth/forgot_password";
import Reset from "views/auth/reset_password";
import Logout from "views/auth/Logout";

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
    skip:false,
  },
  {
    name: "Chat Engagement",
    layout: "/admin",
    path: "chat_engagement",
    component: <ChatEngagement />,
    secondary: true,
    skip:false,
  },
  {
    name: "Chat Conversion",
    layout: "/admin",
    path: "chat_conversation",
    component: <ChatConversation />,
    skip:false,
  },
  {
    name: "Chat Rating",
    layout: "/admin",
    path: "chat_rating",
    component: <ChatRating />,
    skip:false,
  },
  {
    name: "Leads/1000 Visitors",
    layout: "/admin",
    path: "leads",
    component: <Leads />,
    skip:false,
  },
  {
    name: "Time to Answer",
    layout: "/admin",
    path: "time_to_answer",
    component: <TimetoAnswer />,
    skip:false,
  },
  {
    name: "Turns/Chat",
    layout: "/admin",
    path: "turn_chat",
    component: <TurnChat />,
    skip:false,
  },
  {
    name: "Users List",
    layout: "/admin",
    path: "user_list",
    component: <UserList />,
    skip:false,
  },
  {
    name: "User Account",
    layout: "/admin",
    path: "user_account/:id",
    component: <UserAccount />,
    skip:true,
  },
  {
    name: "User Account",
    layout: "/admin",
    path: "user_account",
    component: <UserAccount />,
    skip:true,
  },
  {
    name: "Logout",
    layout: "/admin",
    path: "logout",
    component: <Logout />,
    skip:false,
  },
  {
    name: "Forgot Password",
    layout: "/auth",
    path: "forgot_password",
    component: <Forgot />,
    skip:false,
  },
  {
    name: "Reset Password",
    layout: "/auth",
    path: "reset_password",
    component: <Reset />,
    skip:false,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    component: <SignIn />,
    skip:false,
  }
];
export default routes;
