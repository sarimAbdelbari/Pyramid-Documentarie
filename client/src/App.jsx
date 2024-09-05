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
// import Dashboard from "./pages/dashboard/dashboard";

import Users from "./pages/dashboard/Users/users";
import RoutePath from "./pages/dashboard/route/RoutePath";
import TreePath from "./pages/dashboard/route/TreePath";
import CreateRoute from "./pages/dashboard/route/CreateRoute";
import useRouteAuth from "./hooks/useRoutesContext";
import LoadingScreen from "./utils/loadingScreen";
import PdfReader from "./Routes/readers/pdfReader";
import TableView from "./Routes/readers/tableView";
import Navbar from '@/components/navbar';
import useAuth from "./hooks/useAuthContext";
import DepthBar from "./components/DepthBar";
import { useStateContext } from "./contexts/ContextProvider";
import SideBar from "./components/sidebar";
import { useContext } from 'react'
import { ThemeContext } from '@/components/themeProvider';
import CreateGroop from "./pages/dashboard/Groop/CreateGroop";
import TableGroop from "./pages/dashboard/Groop/TableGroop";


const App =  () => {
  const { theme } = useContext(ThemeContext);
  const isAuthenticated  =  useAuth();
  const { userInfo  } = useStateContext();
  const routeData = useRouteAuth();




  console.log("userInfo",userInfo);
  
  console.log("routeData:::: 1",routeData);

  
 

  useEffect(() => {
    <LoadingScreen />;
  }, [isAuthenticated]);

  // 66d5964dcc2b8f8b5bbc9336
  // 66d5964dcc2b8f8b5bbc9336
  useEffect(() => {
     <LoadingScreen />;
  }, [routeData.length]);


  // const Theme = localStorage.getItem('theme');

  return (
    <div className="min-h-screen  bg-mainLightBg dark:bg-secDarkBg">
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

     {isAuthenticated ? (<>
      <Navbar />
      {userInfo && userInfo.groop[0] !== "66d85e16ca5943ce21271046" && (
        
        <DepthBar/>
      )}
      {
        userInfo && userInfo.groop[0] == "66d85e16ca5943ce21271046" && (
          <SideBar/>
        )
      }
      
      {routeData.length ? (
        <Routes>

          {userInfo && userInfo.groop[0] !== "66d85e16ca5943ce21271046" && (
            <>
          {Object.values(routeData).map((route, index) => (
              <Route
              key={index}
              path={`${route?.route?.path}`}
              element={
                 <ProtectedRoute>
                   {route?.route?.view === 'View1' && <View1 route={route.route} permission={route.permission} />}
                   {route?.route?.view === 'View2' && <View2 route={route} />  }
                   { /* {route?.route?.view === 'View2' ? <View2 route={route} /> :  <LoadingScreen /> } */}
                   {/* create A 404 Page Using the Concept above  */}
                   {route?.route?.view === 'View3' && <View3 route={route} />}
                   {route?.route?.view === 'View4' && <View4 route={route} />}
                   {route?.route?.view === 'View5' && <View5 route={route} />}
                   {route?.route?.view === 'TableView' && <TableView route={route} />}
                   {route?.route?.view === 'PdfReader' && <PdfReader route={route} />}
                   </ProtectedRoute>
                  }
                  />
                  
                ))}
                 {/* {console.log("route?.route?.path" ,routeData?.route?.path)} */}
                </>)}
                
           {userInfo && userInfo.groop[0] == "66d85e16ca5943ce21271046" && (
<>
             {/* <Route
             path="/"
             element={
               <Dashboard />
              }
              /> */}

          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
            />
          <Route
            path="/dashboard/Users"
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
          <Route
          path="/dashboard/groop/create"
          element={
            <ProtectedRoute>
                <CreateGroop />
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
                 
            
        </>
        )}
        </Routes>) : (
          <LoadingScreen/>
        )}
     </>) : (<>

      <Routes>

         <Route path="/"  element={<Login />} />       
         <Route path="/login"  element={<Login />} />       

      </Routes>
      
      </>)}

      

    </div>
  );
};

export default App;
