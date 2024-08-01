import "./App.css";
import { useEffect } from "react";
import Login from "./pages/auth/login";
import Main from "./views/view1";
import View4 from "./views/view4";
import View2 from "./views/view2";
import View3 from "./views/view3";
import View5 from "./views/view5";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/protectedRoute";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/dashboard/Users/users";
import RoutePath from "./pages/dashboard/route/RoutePath";
import TreePath from "./pages/dashboard/route/TreePath";
import CreateRoute from "./pages/dashboard/route/CreateRoute";
import useRouteAuth from "./hooks/useRoutesContext";
import LoadingScreen from "./utils/loadingScreen";

function App() {
  const routeData = useRouteAuth();

  useEffect(() => {
     <LoadingScreen />;
  }, [routeData]);

  const Theme = localStorage.getItem('theme');

  return (
    <div className="bg-mainLightBg dark:bg-secDarkBg min-h-screen">
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
        theme={Theme}
      />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {Object.values(routeData).map((route, index) => (
            <Route
              key={index}
              path={`/${route?.path}`}
              element={
                <ProtectedRoute>
                  {route.view === 'View2' && <View2 data={route.data} />}
                  {route.view === 'View3' && <View3 data={route.data} />}
                  {route.view === 'View4' && <View4 data={route.data} />}
                  {route.view === 'View5' && <View5 data={route.data} />}
                </ProtectedRoute>
              }
            />
          ))}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/view5"
            element={
              <ProtectedRoute>
                <View4 />
              </ProtectedRoute>
            }
          /> */}
            <Route
              path="/dashboard"
              element={
                  <Dashboard />
              }
            />
          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute>
                <Users />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
