import Footer from "components/footer/FooterAuthDefault";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import routes from "routes.js";
//import FixedPlugin from "components/fixedPlugin/FixedPlugin";

export default function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-between pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0">
              <div className="mx-auto flex flex-col lg:max-w-[48%] xl:max-w-full">
              <Routes>
                {getRoutes(routes)}

                <Route
                  path="/auth"
                  element={<Navigate to="/auth/signin" replace />}
                />
              </Routes>
            </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
