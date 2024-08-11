import "./App.css";
import { useEffect } from "react";
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
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/dashboard/Users/users";
import RoutePath from "./pages/dashboard/route/RoutePath";
import TreePath from "./pages/dashboard/route/TreePath";
import CreateRoute from "./pages/dashboard/route/CreateRoute";
import useRouteAuth from "./hooks/useRoutesContext";
import LoadingScreen from "./utils/loadingScreen";
import PdfReader from "./Routes/readers/pdfReader";
import TableView from "./Routes/readers/tableView";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const routeData = useRouteAuth();

  console.log(routeData);
  useEffect(() => {
     <LoadingScreen />;
  }, [routeData]);

  const Theme = localStorage.getItem('theme');

  // const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  // const title = 'Title of PDF';

  return (
    <div className="bg-mainLightBg dark:bg-secDarkBg">
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
      {routeData && 
      <>
        <Routes>
          <Route path="/login" element={<Login />} />
          {Object.values(routeData).map((route, index) => (
           <Route
               key={index}
               path={`${route?.path}`}
               element={
                 <ProtectedRoute>
                   {route.view === 'View1' && <View1 route={{route}} />}
                   {route.view === 'View2' && <View2 route={{route}} />}
                   {route.view === 'View3' && <View3 route={{route}} />}
                   {route.view === 'View4' && <View4 route={{route}} />}
                   {route.view === 'View5' && <View5 route={{route}} />}
                 </ProtectedRoute>
               }
             />
           ))}
            {/* <Route path="/View5" element={<View5 />} /> */}

           <Route
            path="/pdf"
            element={
              <ProtectedRoute>
                 <PdfReader />
                 {/* <PdfReader pdfUrl={pdfUrl} title={title} /> */}
              </ProtectedRoute>
            }
          />
           <Route
            path="/TableView"
            element={
              <ProtectedRoute>
                 <TableView />
                 {/* <PdfReader pdfUrl={pdfUrl} title={title} /> */}
              </ProtectedRoute>
            }
          />
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
      </>}
    </div>
  );
};

export default App;
