import React, { Component } from 'react';
import Logo from "../../assets/svg/logo.svg";

const Header = () => {
  return (
    <div className="fixed top-0 py-[26px] px-12 w-full z-50 bg-white shadow-4xl">

       <img
                className="rounded-xl w-40"
                src={Logo}
                alt=""
              />
    </div>
  );
};

export default Header;
