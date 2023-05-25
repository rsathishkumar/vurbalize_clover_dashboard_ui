import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "components/header";
import Footer from "components/footer/Footer";
import routes from "routes.js";
import ChatScreen from "views/admin/chat";

export default function Chat(props) {

  return (
    <div className="flex h-full w-full">
      <Header />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-white dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] mt-[94px] flex-none transition-all md:pr-2`}
        >
          {/* Routes */}
          <div className="h-full">
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <ChatScreen />
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
