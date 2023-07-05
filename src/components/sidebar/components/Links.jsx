/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";
// chakra imports

export function SidebarLinks(props) {
  // Chakra color mode
  let location = useLocation();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (
        (route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
        ) && (route.skip === false)
      ) {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className={`py-[8px] flex cursor-pointer items-center px-6 w-full ${
                  activeRoute(route.path) === true
                    ? "bg-green-900"
                    : ""
                }`}
                key={index}
              >
                <span
                  className="font-poppins font-medium text-sm text-white"
                >
                </span>
                <p
                  className={`leading-1 flex font-poppins font-medium text-sm text-white`}
                >
                  {route.name}
                </p>
              </li>
            </div>
          </Link>
        );
      }
    });
  };
  // BRAND
  return createLinks(routes);
}

export default SidebarLinks;
