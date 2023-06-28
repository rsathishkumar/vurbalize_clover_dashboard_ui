import {useEffect, useState, React} from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import ChatLayout from "layouts/chat";

const App = () => {

  const [isLogged, setIsLogged] = useState(false)
  const location = useLocation(); 

  async function getToken() {
    const tokenString = await localStorage.getItem('token');
    console.log("token",tokenString)
    console.log(location.pathname);
    if(!tokenString && tokenString === null && location.pathname !== '/auth/sign-in') {
      window.location.href = '/auth/sign-in';
    }
    else {
      setIsLogged(true)
    }
  }

  useEffect(() => {
    getToken();   
  }, []);


  return (
      <>
      {isLogged && 
        <Routes>
            <Route path="auth/*" element={<AuthLayout />} />
            <Route path="admin/*" element={<AdminLayout />} />
            <Route path="chat/*" element={<ChatLayout />} />
            <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      }
      {!isLogged &&
       <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="/" element={<AuthLayout />} />
      </Routes>
      }
      </>
);
};

export default App;
