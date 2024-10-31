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
import CreateRoute from "@/pages/dashboard/route/CreateRoute";
import useRouteAuth from "@/hooks/useRoutesContext";
import LoadingScreen from "@/utils/loadingScreen";
import PdfReader from "@/Routes/readers/pdfReader";
import TableView from "@/Routes/views/tableView";
import Navbar from "@/components/navbar";
import useAuth from "@/hooks/useAuthContext";
// import CMSRoadmap from "@/components/CMSRoadmap";
import { useStateContext } from "@/contexts/ContextProvider";
import SideBar from "@/components/sidebar";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/themeProvider";
// import CreateGroop from "@/pages/dashboard/Groop/CreateGroop";
import TableGroop from "@/pages/dashboard/Groop/TableGroop";
import UpdateGroop from "@/pages/dashboard/Groop/UpdateGroop";
import RDPage from "@/pages/Other/RDPage";
import View6 from "@/Routes/views/view6";
import CreateUser from "@/pages/dashboard/Users/CreateUser";
import ExcelReader from "@/Routes/readers/excelReader";
// import Test from "@/Routes/readers/Test";
import DuplicateGroop from "@/pages/dashboard/Groop/DuplicateGroop";
import WordReader from "@/Routes/readers/wordReader";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const isAuthenticated = useAuth();
  const { userInfo } = useStateContext();
  const routeData = useRouteAuth();

  return (
    <div className="min-h-screen bg-[#f2f4f8] dark:bg-secDarkBg ">
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

      {isAuthenticated ? (
        <div className="px-4 lg:px-8">
          {userInfo?.active ? (
            <>
              <Navbar />

              {/* Admin Routes */}
              {userInfo?.admin ? (
                <div className="flex pb-11 justify-center gap-10 ">
                  <div className="w-1/5 ">
                    <SideBar />
                  </div>
                  <div className="w-4/5">
                    <Routes>
                      {/* <Route
                        path="/dashboard/TableauDeBord"
                        element={
                            
                        }
                      /> */}
                      <Route
                        path="/dashboard/users/table"
                        element={<Users />}
                      />
                      <Route
                        path="/dashboard/users/create"
                        element={<CreateUser />}
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
                        path="/dashboard/route/create"
                        element={<CreateRoute />}
                      />
                      <Route
                        path="/dashboard/groop/update/:id"
                        element={<UpdateGroop />}
                      />
                      <Route
                        path="/dashboard/groop/duplicate/:id"
                        element={<DuplicateGroop />}
                      />
                      <Route
                        path="/dashboard/groop/table"
                        element={<TableGroop />}
                      />
                    </Routes>
                  </div>
                </div>
              ) : (
                // Normal User Routes
                <>
                  {routeData ? (
                    <div className="mb-7">
                      {/* <CMSRoadmap routeData={routeData} /> */}
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
                                  return null; // or any default case you might want
                              }
                            })()}
                          />
                        ))}
                        <Route path="/View6" element={<View6 />} />
                      </Routes>
                    </div>
                  ) : (
                    <LoadingScreen />
                  )}
                </>
              )}
            </>
          ) : (
            // Redirect inactive users to RDPage
            <>
              <Navbar />

              <Routes>
                <Route path="/*" element={<RDPage />} />
              </Routes>
            </>
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
