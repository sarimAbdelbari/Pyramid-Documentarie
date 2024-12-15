import { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TiHomeOutline } from "react-icons/ti";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

// Recursive function to convert routeData into a nested structure
const createRouteTree = (routes) => {
  const routeMap = {};
  
  // Map each route by ID for easy access
  routes.forEach(route => {
    routeMap[route._id] = { ...route, children: [] };
  });

  const rootRoutes = [];
  
  // Organize routes based on their parent-child relationships
  routes.forEach(route => {
    if (route.parrentPath && routeMap[route.parrentPath]) {
      routeMap[route.parrentPath].children.push(routeMap[route._id]);
    } else {
      rootRoutes.push(routeMap[route._id]);
    }
  });

  return rootRoutes;
};



const renderRoutes = (routes, depth = 0, parentKey = "") => {
    return routes.map((routePermission, index) => {
      const key = `${parentKey}-${index}`;
      const isOpen = openRoutes[key]; // Manage the open/closed state
  
      return (
        <div key={key} className="border-b border-slate-200 overflow-y-auto px-3">
          <button
            onClick={() => toggleAccordion(key)}
            className={`w-full flex justify-between items-center py-4 my-4 text-slate-800 dark:text-gray-200 
            ${depth > 0 ? `pl-${depth * 4}` : ''} transition-all duration-300`}
            style={{
              paddingLeft: `${depth * 15}px`,
              backgroundColor: `rgba(0, 0, 0, ${depth * 0.05})`,
            }}
          >
            <span>{routePermission.title}</span>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
              {isOpen ? <HiMiniMinusSmall /> : <HiMiniPlusSmall />}
            </span>
          </button>
  
          <div className={`transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}>
            <div className="text-sm text-slate-500 dark:text-gray-400 flex flex-col gap-4">
              <p>Permission: <span>{routePermission.permission}</span></p>
              <p className="text-xs">{routePermission.details}</p>
              {routePermission.file && (
                <a href={`${import.meta.env.VITE_PUBLIC_URLFILE}/${routePermission.file}`} download>
                  Télécharger le fichier
                </a>
              )}
            </div>
  
            {/* Recursively render child routes if present */}
            {routePermission.children.length > 0 && (
              <div className="pl-2">
                {renderRoutes(routePermission.children, depth + 1, key)}
              </div>
            )}
          </div>
        </div>
      );
    });
  };
  


// Depth bar component
const DepthBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed z-50 bottom-5 right-5 bg-white text-textLightColor dark:bg-secDarkBg dark:text-textDarkColor dark:shadow-white p-6 rounded-2xl shadow-lg flex justify-center items-center gap-5">
      {location.pathname !== '/principal' && (
        <MdKeyboardArrowLeft
          onClick={() => navigate(-1)}
          className="text-2xl text-textSecLightColor dark:text-textDarkColor cursor-pointer hover:text-darkPrimary hover:scale-125 ease-in-out duration-300"
        />
      )}
      
      <Link to="/principal" className="text-2xl cursor-pointer mx-3 text-textSecLightColor hover:text-darkPrimary hover:scale-125 ease-in-out duration-300">
        <TiHomeOutline className="text-2xl text-textLightColor dark:text-textDarkColor cursor-pointer hover:text-darkPrimary" />
      </Link>
      <MdKeyboardArrowRight
        onClick={() => navigate(+1)}
        className="text-2xl text-textSecLightColor hover:text-darkPrimary dark:text-textDarkColor cursor-pointer hover:scale-125 ease-in-out duration-300"
      />
    </div>
  );
};

// Main component combining DepthBar and RouteTree
const CMSRoadmap = ({ routeData }) => {
  return (
 
      <DepthBar />
      
  );
};

export default CMSRoadmap;
