import "@/App.css";
import Login from "@/pages/auth/login";
import View1 from "@/Routes/views/view1";
import View4 from "@/Routes/views/view4";
import View2 from "@/Routes/views/view2";
import View3 from "@/Routes/views/view3";
import View5 from "@/Routes/views/view5";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "@/pages/dashboard/Users/users";
import RoutePath from "@/pages/dashboard/route/RoutePath";
import TreePath from "@/pages/dashboard/route/TreePath";
import useRouteAuth from "@/hooks/useRoutesContext";
import LoadingScreen from "@/utils/loadingScreen";
import PdfReader from "@/Routes/readers/pdfReader";
import TableView from "@/Routes/views/tableView";
import Navbar from "@/components/navbar";
import useAuth from "@/hooks/useAuthContext";
import CMSRoadmap from "@/components/CMSRoadmap";
import { useStateContext } from "@/contexts/ContextProvider";
import SideBar from "@/components/sidebar";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/themeProvider";
import TableGroop from "@/pages/dashboard/Groop/TableGroop";
import RDPage from "@/pages/Other/RDPage";
import View6 from "@/Routes/views/view6";
import ExcelReader from "@/Routes/readers/excelReader";
import WordReader from "@/Routes/readers/wordReader";
import TableauDeBord from "@/pages/dashboard/Statistiques/tableauDeBord";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const isAuthenticated = useAuth();
  const { userInfo } = useStateContext();
  const routeData = useRouteAuth();
  const { isLoading } = useStateContext();

  return (
    <div className="h-screen overflow-hidden bg-secLightBg dark:bg-secDarkBg">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
      {isLoading && <LoadingScreen />}

      {isAuthenticated ? (
        <div className="h-full flex flex-col">
          {userInfo?.active ? (
            <>
              {userInfo?.admin ? (
                <div className="h-full flex flex-col">
                  {/* Navbar */}
                  <Navbar className="flex-shrink-0" />

                  <div className="flex h-full overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-1/5 lg:w-1/5 h-full hide-scrollbar overflow-y-auto">
                      <SideBar />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-4 lg:p-6 overflow-y-auto hide-scrollbar">
                      <Routes>
                        <Route
                          path="/dashboard/TableauDeBord"
                          element={<TableauDeBord />}
                        />
                        <Route
                          path="/dashboard/users/table"
                          element={<Users />}
                        />
                        <Route
                          path="/dashboard/route/table"
                          element={<RoutePath />}
                        />
                        <Route
                          path="/dashboard/route/tree"
                          element={<TreePath />}
                        />
                        <Route
                          path="/dashboard/groop/table"
                          element={<TableGroop />}
                        />
                      </Routes>
                    </div>
                  </div>
                </div>
              ) : (
                // Normal User Routes
                <div className="h-full flex flex-col">
                  <Navbar className="flex-shrink-0" />
                  <CMSRoadmap routeData={routeData} className="flex-shrink-0" />

                  <div className="flex-1 p-4 lg:p-6 overflow-y-auto hide-scrollbar">
                    <Routes>
                      {Object.values(routeData).map((route, index) => (
                        <Route
                          key={index}
                          path={`${route?.path}`}
                          element={(() => {
                            switch (route?.view) {
                              case "View1":
                                return <View1 route={route} />;
                              case "View2":
                                return <View2 route={route} />;
                              case "View3":
                                return <View3 route={route} />;
                              case "View4":
                                return <View4 route={route} />;
                              case "View5":
                                return <View5 route={route} />;
                              case "TableView":
                                return <TableView route={route} />;
                              case "PdfReader":
                                return <PdfReader route={route} />;
                              case "ExcelReader":
                                return <ExcelReader route={route} />;
                              case "WordReader":
                                return <WordReader route={route} />;
                              default:
                                return null;
                            }
                          })()}
                        />
                      ))}
                      <Route path="/View6" element={<View6 />} />
                    </Routes>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Redirect inactive users to RDPage
            <div className="h-full flex flex-col">
              <Navbar className="flex-shrink-0" />
              <div className="flex-1">
                <Routes>
                  <Route path="/*" element={<RDPage />} />
                </Routes>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Login Route for unauthenticated users
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
