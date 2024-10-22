import "./App.css";
import Login from "./pages/auth/login";
import View1 from "./Routes/views/view1";
import View4 from "./Routes/views/view4";
import View2 from "./Routes/views/view2";
import View3 from "./Routes/views/view3";
import View5 from "./Routes/views/view5";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/protectedRoute";
import Users from "./pages/dashboard/Users/users";
import RoutePath from "./pages/dashboard/route/RoutePath";
import TreePath from "./pages/dashboard/route/TreePath";
import CreateRoute from "./pages/dashboard/route/CreateRoute";
import useRouteAuth from "./hooks/useRoutesContext";
import LoadingScreen from "./utils/loadingScreen";
import PdfReader from "./Routes/readers/pdfReader";
import TableView from "./Routes/views/tableView";
import Navbar from '@/components/navbar';
import useAuth from "./hooks/useAuthContext";
import DepthBar from "./components/DepthBar";
import { useStateContext } from "./contexts/ContextProvider";
import SideBar from "./components/sidebar";
import { useContext } from 'react';
import { ThemeContext } from '@/components/themeProvider';
// import CreateGroop from "./pages/dashboard/Groop/CreateGroop";
import TableGroop from "./pages/dashboard/Groop/TableGroop";
import UpdateGroop from "./pages/dashboard/Groop/UpdateGroop";
import RDPage from "./pages/Other/RDPage";
import View6 from "./Routes/views/view6";
import CreateUser from "./pages/dashboard/Users/CreateUser";
import ExcelReader from "./Routes/readers/excelReader"; 
// import Test from "./Routes/readers/Test";
import Dashboard from "./pages/dashboard/dashboard";
import DuplicateGroop from "./pages/dashboard/Groop/DuplicateGroop";
import WordReader from "./Routes/readers/wordReader";

const App = () => {
  const { theme } = useContext(ThemeContext);
  const isAuthenticated = useAuth();
  const { userInfo } = useStateContext();
  const routeData = useRouteAuth();

  return (
    <div className="min-h-screen bg-[#f2f4f8] dark:bg-secDarkBg relative">
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
                  <div className="flex">
                  <SideBar />
                  <div className="w-full">
                  <Routes>
                    <Route
                      path="/dashboard/TableauDeBord"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/users/table"
                      element={
                        <ProtectedRoute>
                          <Users />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/users/create"
                      element={
                        <ProtectedRoute>
                          <CreateUser />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/route/table"
                      element={
                        <ProtectedRoute>
                          <RoutePath />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/route/tree"
                      element={
                        <ProtectedRoute>
                          <TreePath />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/route/create"
                      element={
                        <ProtectedRoute>
                          <CreateRoute />
                        </ProtectedRoute>
                      }
                    />              
                    <Route
                      path="/dashboard/groop/update/:id"
                      element={
                        <ProtectedRoute>
                          <UpdateGroop />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/groop/duplicate/:id"
                      element={
                        <ProtectedRoute>
                          <DuplicateGroop />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/groop/table"
                      element={
                        <ProtectedRoute>
                          <TableGroop />
                        </ProtectedRoute>
                      }
                    />
              </Routes>

                  </div>
             
                  </div>
                ) : (
                  // Normal User Routes
                  <>
                    {routeData ? (
                      <>
                        <DepthBar />
                      <Routes>
                        {Object.values(routeData).map((route, index) => (
                          <Route
                            key={index}
                            path={`${route?.path}`}
                            element={
                              <ProtectedRoute>
                                {route?.view === "View1" && <View1 route={route} />}
                                {route?.view === "View2" && <View2 route={route} />}
                                {route?.view === "View3" && <View3 route={route} />}
                                {route?.view === "View4" && <View4 route={route} />}
                                {route?.view === "View5" && <View5 route={route} />}
                                {route?.view === "TableView" && <TableView route={route} />}
                                {route?.view === "PdfReader" && <PdfReader route={route} />}
                                {route?.view === "ExcelReader" && <ExcelReader route={route} />}
                                {route?.view === "WordReader" && <WordReader route={route} />}
                              </ProtectedRoute>
                            }
                          />
                        ))}
                          <Route path="/View6" element={<View6 />} />   
                       </Routes>
                      </>
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
