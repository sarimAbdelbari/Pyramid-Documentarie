import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import { HiMiniPlusSmall ,HiMiniMinusSmall} from "react-icons/hi2";
import { GoDuplicate } from "react-icons/go";

const GroopCard = ({ groop, onDelete ,OnUpdateOpen ,OnDuplicateOpen }) => {
  const [openRoutes, setOpenRoutes] = useState({}); // Track open/close state of each route
  const [organizedRoutes, setOrganizedRoutes] = useState([]);

  const toggleAccordion = (key) => {
    setOpenRoutes((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  const organizeRoutes = (routes) => {
    const routeMap = {};
    const rootRoutes = [];

    routes.forEach((routePermission) => {
      const route = routePermission.route;
      route.children = [];
      routeMap[route._id] = routePermission;
    });

    routes.forEach((routePermission) => {
      const route = routePermission.route;
      if (route.parrentPath) {
        const parent = routeMap[route.parrentPath];
        if (parent) {
          parent.route.children.push(routePermission);
        }
      } else {
        rootRoutes.push(routePermission);
      }
    });

    setOrganizedRoutes(rootRoutes);
  };

  useEffect(() => {
    organizeRoutes(groop.groopRoutes);
  }, [groop]);


  const renderRoutes = (routes, depth = 0, parentKey = "") => (
    routes.map((routePermission, index) => {
      const key = `${parentKey}-${index}`; 
      const isOpen = openRoutes[key];
  
      return (
        <div key={key} className="border-b border-slate-200 overflow-y-auto px-3" >
          <button
            onClick={() => toggleAccordion(key)}
            className={`w-full flex justify-between items-center py-4 my-4 text-slate-800 dark:text-gray-200 
              ${depth > 0 ? `pl-${depth * 4}` : ''} transition-all duration-300`}
            style={{
              paddingLeft: `${depth * 15}px`,
              backgroundColor: `rgba(0, 0, 0, ${depth * 0.05})`,
            }}
          >
            <span>{routePermission.route.title}</span>
            <span
              className={`transform transition-transform duration-300 hover:scale-150  ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              {isOpen ? <HiMiniMinusSmall /> : <HiMiniPlusSmall />
              }
            </span>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out overflow-y-auto
              ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}
          >
            {(routePermission?.route?.view === 'PdfReader' || routePermission?.route?.view === 'ExcelReader' || routePermission?.route?.view === 'WordReader') && (
              
              <div className="text-sm text-slate-500 dark:text-gray-400 flex flex-col gap-4" >
              <p>
                Permission:{" "}
                <span
                  className={`font-medium ${
                    routePermission?.route?.view.includes('PdfReader')
                      ? 'text-[#980100]'
                      : routePermission?.route?.view.includes('ExcelReader')
                      ? 'text-[#005217]'
                      : routePermission?.route?.view.includes('WordReader')
                      ? 'text-[#2B579A]' 
                      : 'text-textSecLightColor'
                      }`}
                      >
                  {routePermission.permission === 'Download' ? 'Télécharger' : 'Pas de telechargement'}
                </span>
              </p>
              <p className="text-xs text-textSecLightColor font-light " >{routePermission.route.details}</p>
              {routePermission.route.file && (
                <a
                href={`${import.meta.env.VITE_PUBLIC_URLFILE}/${routePermission.route.file}`}
                download
                className="text-primary hover:text-darkPrimary my-2 underline"
                >
                  Télécharger le fichier  
                </a>
              )}
            </div>
)}

            {/* Recursively render child routes if present */}
            {routePermission.route.children.length > 0 && (
              <div className="pl-2">
                {renderRoutes(routePermission.route.children, depth + 1, key)}
              </div>
            )}
          </div>
        </div>
      );
    })
  );

  return (
    <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-4 my-2 flex flex-col justify-between  h-full min-h-96    duration-300 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold my-4 text-center text-gray-800 dark:text-gray-200">
        {groop.groopName}
      </h2>
    
      <div 
          onClick={()=> OnDuplicateOpen(groop._id)}
           className="absolute top-9 right-9"
        >
          <GoDuplicate  className="text-2xl hover:scale-125 text-textSecLightColor hover:text-textLightColor cursor-pointer ease-in-out duration-300"/>
        </div>
     <div className="absolute top-0 right-0"></div>
      <div className="mb-4 bg-gray-50 bg-opacity-50 dark:bg-gray-700 rounded-lg p-4 shadow-md">
        <div className="mb-4  overflow-y-auto px-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 py-1">
            Routes & Autorisations:
          </h3>
          {renderRoutes(organizedRoutes)}
        </div>

        <div className="mb-4 bg-gray-50 bg-opacity-50 dark:bg-gray-700 rounded-lg p-4 shadow-md">
  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 py-2 border-b border-gray-200 dark:border-gray-600 mb-2">
  Utilisateurs:
  </h3>
  <ul className="list-none space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
    {groop.groopUsers.map((user, index) => (
      <li
        key={index}
        className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
      >
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-semibold text-gray-800 dark:text-gray-100 mr-3">
          {user.userName.charAt(0).toUpperCase()}
        </div>
        <span className=" dark:text-gray-200 text-sm text-textSecLightColor">
          {user.userName} - {user.email}
        </span>
      </li>
    ))}
  </ul>
</div>

      </div>

      <div className="flex justify-between items-center">
        <div 
          onClick={()=> OnUpdateOpen(groop._id)}
          className="bg-gray-100 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-xl flex items-center gap-2 transition-colors"
        >
          <Button Text="Mise à jour" Icon={<FaEdit />} />
        </div>
        <button
          onClick={() => onDelete(groop._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl transition-colors"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default GroopCard;
