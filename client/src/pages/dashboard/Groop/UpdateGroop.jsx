import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { FaRegCircleXmark } from "react-icons/fa6";
import {
    error_toast,
    info_toast,
    sucess_toast,
  } from "@/utils/toastNotification";
import CheckButton from "@/components/checkButton";
import Button from "@/components/button";
import { MdOutlineFileDownload ,MdOutlineFileDownloadOff } from "react-icons/md";


const UpdateGroop = ({groop ,onClose}) => {

    const [groopName, setGroopName] = useState("");
    const [routes, setRoutes] = useState([]);
    const [files, setFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
  
    const [users, setUsers] = useState([]);
  
  
    
    const [selectedRoutes, setSelectedRoutes] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [routePermissionPair, setRoutePermissionPair] = useState({
      route: null,
      permission: 'NoDownload',
      type: "file",
    });
  
    const optionsUsers = users.map((user) => ({
      value: user._id,
      label: user.userName,
    }));
    const [showPages, setShowPages] = useState(false);
  
    const optionsPermmissions = [
      { value: "Download", label: "Télécharger" },
      { value: "NoDownload", label: "pas de téléchargement" },
    ];

    const optionsPages = routes
    .filter((route) => !selectedRoutes.some((pair) => pair.route === route._id))
    .map((route) => ({
      value: route._id,
      label: route.title,
    }));

  const optionsFiles = files
    .filter((route) => !selectedRoutes.some((pair) => pair.route === route._id))
    .map((route) => ({
      value: route._id,
      label: route.title,
    }));

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    // Filtered selectedRoutes based on the search term
    const filteredRoutes = selectedRoutes.filter((pair) => {
      const routeTitle = routes.find((route) => route._id === pair.route)?.title || 
                          files.find((route) => route._id === pair.route)?.title || "";
      return routeTitle.toLowerCase().includes(searchTerm.toLowerCase());
    });


    const addRoutePermission = () => {

        if (routePermissionPair.route) {
    
          const isDuplicate = selectedRoutes.some(
            (pair) =>
              pair.route === routePermissionPair.route &&
              pair.permission === routePermissionPair.permission
          );
    
          if (!isDuplicate) {
    
            setSelectedRoutes([
              ...selectedRoutes,
              {
                route: routePermissionPair.route,
                permission: routePermissionPair.permission || "NoDownload",
                type: routePermissionPair.type,
              },
            ]);
    
            setRoutePermissionPair({
              route: null,
              permission: routePermissionPair.permission || "NoDownload",
              type: routePermissionPair.type,
            });
    
          } else {
            info_toast("Cette paire route-autorisation a déjà été ajoutée.");
          }
        }
      };
    
      const removeRoutePermission = (index) => {
      
        const updatedRoutes = [...selectedRoutes];
        updatedRoutes.splice(index, 1);
        
        setSelectedRoutes(updatedRoutes);
     
      };
    

      const fetchData = async () => {
    
        try {
    
          const responseFiles = await axios.get(
            `${import.meta.env.VITE_API_URL}/route/files`
          );
          const responsePages = await axios.get(
            `${import.meta.env.VITE_API_URL}/route/pages`
          );
          const responseUsers = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
    
          setFiles(responseFiles.data);
       

          setRoutes(responsePages.data);
          setUsers(responseUsers.data);
    
          if (groop) {
            const responseGroop = await axios.get(
              `${import.meta.env.VITE_API_URL}/groop/${groop}`
            );
            setGroopName(responseGroop.data.groopName);
            setSelectedUsers(
              responseGroop.data.groopUsers.map((user) => ({
                value: user._id,
                label: user.userName,
              }))
            );
    
            // filter the routes by the views that are PdfReader or ExcelReader
            const routes = responseGroop.data.groopRoutes.filter(
              (route) =>
                route.route.view.includes("PdfReader") ||
                route.route.view.includes("ExcelReader") ||
                route.route.view.includes("WordReader")
            );
     
            const filteredRoutes = routes.map((route) => ({
              route: route.route._id,
              permission: route.permission,
              type: 'file',
            })) 
    
            setSelectedRoutes(...selectedRoutes, filteredRoutes);
    
          }
    
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [groop]);
      
    
      
    
      const handleSubmit = async () => {
        try {
          if (!groopName) {
            info_toast("Nom du groupe doit être renseigné");
            return;
          }
          if (selectedRoutes.length === 0) {
            info_toast("Veuillez ajouter au moins une route");
            return;
          }
          if (selectedUsers.length === 0) {
            info_toast("Veuillez ajouter au moins un utilisateur");
            return;
          }
     
    
          await axios.patch(`${import.meta.env.VITE_API_URL}/groop/${groop}`, {
            groopName,
            groopUsers: selectedUsers.map((user) => user.value),
            groopRoutes: selectedRoutes,
          });
    
          setGroopName("");
          setSelectedRoutes([]);
          setSelectedUsers([]);
          onClose()
          sucess_toast("Groop updated successfully");
    
        } catch (error) {
          error_toast("Erreur lors de la mise à jour du groupe :");
          console.error("Error:", error.response?.data);
        }
      };
      const changeType = (showPages) => {
        setRoutePermissionPair({
          route: null,
          permission: 'NoDownload',
          type: showPages ? "file" : "page",
        });
        setShowPages(!showPages);
      };

      const onChangePermission = (selectedOption) => {
      
        setRoutePermissionPair({
          ...routePermissionPair,
          permission: selectedOption.value,
        });
      };

      const onChangeRoute = (selectedOption) => {
        setRoutePermissionPair({
          ...routePermissionPair,
          route: selectedOption.value,
        });
      };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 shadow-xl flex items-center justify-center z-40  p-3 md:p-5 lg:p-7 ">

    <div className="flex flex-col justify-between items-center gap-5  bg-white dark:bg-gray-800 px-5 sm:px-8 md:px-11 py-7 rounded-2xl shadow-lg dark:shadow-white w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-4 h-full overflow-y-auto ">
    <div>
    <p className=" text-xl sm:text-2xl md:text-3xl text-textLightColor dark:text-textDarkColor font-semibold text-center">
      Mise à jour de <span className="text-darkPrimary">{groopName}</span>
    </p>

    </div>
    <FaRegCircleXmark
      onClick={() => onClose()}
      className="absolute top-4 right-4 sm:top-5 sm:right-5 text-lg sm:text-xl md:text-2xl text-secLightBg hover:text-textSecLightColor  dark:text-textDarkColor cursor-pointer"
    />
     <div className="flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-7 w-full">

      <p className="mb-1 text-md sm:text-xl md:text-2xl font-normal text-textSecLightColor">Nom de Groop</p>
      <input
        type="text"
        placeholder="Nom du groupe"
        className="w-full border border-gray-300 rounded-lg p-2 mt-4"
        value={groopName}
        onChange={(e) => setGroopName(e.target.value)}
      />
     </div>
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-5 md:gap-7 w-full">
        <p className="mb-1 text-md sm:text-xl md:text-2xl font-normal text-textSecLightColor">Users</p>
        <Select
          value={selectedUsers}
          onChange={setSelectedUsers}
          options={optionsUsers}
          isSearchable
          isMulti={true}
          placeholder="Sélectionner les utilisateurs"
          className="w-full rounded-md focus:outline-none focus:border-b-secLightBg z-40 max-h-20"
        />
        <p className="mb-1 text-md sm:text-xl md:text-2xl font-normal text-textSecLightColor">Route et Autorisation</p>
        <div className="w-full">
          <div className="w-fit" onClick={() => changeType(showPages)}>
            <CheckButton Text="ShowPages" Checked={showPages} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full bg-secLightBg dark:bg-mainDarkBg rounded-lg px-4 py-6">
          {!showPages && (
            <Select
              value={
                optionsPermmissions.find(
                  (option) => option.value === routePermissionPair.permission
                ) || null
              }
              options={optionsPermmissions}
              onChange={onChangePermission}
              isSearchable
              placeholder="Sélectionner une autorisation"
              className="w-full rounded-md focus:outline-none focus:border-b-secLightBg z-30 max-h-20"
            />
          )}
          <Select
            value={
              showPages
                ? optionsPages.find((option) => option.value === routePermissionPair.route) || null
                : optionsFiles.find((option) => option.value === routePermissionPair.route) || null
            }
            onChange={onChangeRoute}
            options={showPages ? optionsPages : optionsFiles}
            isSearchable
            placeholder={showPages ? "Sélectionner une page" : "Sélectionner un fichier"}
            className="w-full rounded-md focus:outline-none focus:border-b-secLightBg z-30 max-h-20"
          />
          <button
            onClick={addRoutePermission}
            className="text-textSecLightColor hover:text-textLightColor font-medium"
          >
            Ajouter
          </button>
        </div>
        <div className="p-4  grid grid-flow-row gap-4 max-h-52 overflow-y-auto w-full">
        <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Rechercher une route"
        className="w-full p-2  border-gray-300 shadow-md dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg"
      />

        </div>
        <div className="p-4  grid grid-flow-row gap-4 max-h-52 overflow-y-auto w-full">

          {filteredRoutes.length > 0 && (
            filteredRoutes.map((pair, index) => (
              <div
              key={index}
              className="flex justify-between items-center px-3 py-3 border-gray-300 shadow-md dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg"
            >
              <span className="flex items-center gap-2">
                {routes.find((route) => route._id === pair.route)?.title ||
                  files.find((route) => route._id === pair.route)?.title}{" "}
                  - {pair.permission === "Download" ? <MdOutlineFileDownload className="text-green-700 text-lg " /> : <MdOutlineFileDownloadOff className="text-red-700 text-lg"  />}
              </span>
              <button
              onClick={() => removeRoutePermission(index)}
              className="text-red-500 hover:text-red-700"
              >
              Supprimer
              </button>
            </div>
          ))
          )}

      
        </div>
      </div>
      <div onClick={() => handleSubmit()}>
        <Button Text="Mis A Jour" />
      </div>
    </div>
</div>

  )
}

export default UpdateGroop