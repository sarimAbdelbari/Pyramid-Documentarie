import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Button from "@/components/button";
import { sucess_toast, error_toast ,info_toast} from "@/utils/toastNotification";
import CheckButton from "@/components/checkButton";

const CreateGroop = ({onClose}) => {
  const [groopName, setGroopName] = useState("");
  const [routes, setRoutes] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [routePermissionPair, setRoutePermissionPair] = useState({
    route: null,
    permission: 'NoDownload',
    type: 'file',
  });
  const [showPages ,setShowPages] = useState(false);
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const responseFiles = await axios.get(`${import.meta.env.VITE_API_URL}/route/files`);
      const responsePages = await axios.get(`${import.meta.env.VITE_API_URL}/route/pages`);
      const responseUsers = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setRoutes(responseFiles.data);
      setFiles(responsePages.data);
      setUsers(responseUsers.data);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    } finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const optionsPages = routes
    .filter((route) => !selectedRoutes.some((pair) => pair.route === route._id))
    .map((route) => ({
      value: route._id,
      label: route.title,
    }));

  const optionsfiles = files
    .filter((route) => !selectedRoutes.some((pair) => pair.route === route._id))
    .map((route) => ({
      value: route._id,
      label: route.title,
    }));

  const optionsUsers = users.map((user) => ({
    value: user._id,
    label: user.userName,
  }));

  const optionsPermissions = [
    { value: "Download", label: "Télécharger" },
    { value: "NoDownload", label: "pas de téléchargement" },
  ];


  const onChangeRoute = (selectedOption) => {
    setRoutePermissionPair({
      ...routePermissionPair,
      route: selectedOption.value,
    });
  };

  const onChangeUser = (selectedOption) => {
    setSelectedUsers(selectedOption);
  };

  const onChangePermission = (selectedOption) => {
    setRoutePermissionPair({
      ...routePermissionPair,
      permission: selectedOption.value,
    });
  };

  const addRoutePermission = () => {
    if (routePermissionPair.route) {
      const isDuplicate = selectedRoutes.some(
        (pair) =>
          pair.route === routePermissionPair.route &&
          pair.permission === routePermissionPair.permission
      );

      if (!isDuplicate) {
        setSelectedRoutes([...selectedRoutes,  { route: routePermissionPair.route , permission: routePermissionPair.permission , type: routePermissionPair.type}]);
        setRoutePermissionPair({ route: null, permission: 'NoDownload', type: routePermissionPair.type });
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

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
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


      await axios.post(`${import.meta.env.VITE_API_URL}/groop`, {
        groopName,
        groopUsers: selectedUsers.map((user) => user.value),
        groopRoutes: selectedRoutes,
      });

      
      setGroopName("");
      setSelectedRoutes([]);
      setSelectedUsers([]);
      
      onClose();
     
      sucess_toast("Groop created successfully");
    } catch (error) {
      setIsLoading(false)
      error_toast("Erreur lors de la création du groupe :");
      console.error("Error:", error.response?.data);
    } finally {
      setIsLoading(false)
    }
  };
  const changeType = (showPages) => {
    setRoutePermissionPair({ route: null, permission: 'NoDownload', type: showPages ? 'file' : 'page' });
    setShowPages(!showPages)
  }

  return (
   
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 shadow-xl flex items-center justify-center  z-40 p-5 md:p-7 lg:p-10 " >
      <div className="bg-white dark:bg-gray-800 px-9 py-7 rounded-2xl shadow-lg dark:shadow-white w-full max-w-4xl  h-full overflow-y-auto flex flex-col justify-between ">
        <h3 className="text-xl font-semibold dark:text-white mb-4">
          Créer un Groop
        </h3>
        <div className="mb-4">
          <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300 ">
            Nom du groupe
          </label>
          <input
            type="text"
            value={groopName}
            onChange={(e) => setGroopName(e.target.value)}
            className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Utilisateurs
          </label>
          <Select
            value={selectedUsers}
            onChange={onChangeUser}
            options={optionsUsers}
            isSearchable
            isMulti
            placeholder="Sélectionner des utilisateurs"
            className="w-full rounded-md focus:outline-none focus:border-b-secLightBg z-30 max-h-20"
          />
        </div>
        <div className="mb-4">
          <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Route et Autorisation
          </label>
          <div onClick={() => changeType(showPages)} className="w-fit">
          <CheckButton Text="ShowPages" Checked={showPages} />

          </div>
          <div className="flex gap-4 w-full bg-mainLightBg dark:bg-mainDarkBg rounded-lg px-4 py-6">
            {showPages ? null : <Select
              value={
                optionsPermissions.find((option) => option.value === routePermissionPair.permission) || null
              }
              options={optionsPermissions}
              onChange={onChangePermission}
              isSearchable
              placeholder="Sélectionner une autorisation"
              className="w-full rounded-md focus:outline-none focus:border-b-secLightBg z-20 max-h-20"
            />}
            
            <Select
              value={showPages ? optionsfiles.find((option) => option.value === routePermissionPair.route) || null :
                optionsPages.find((option) => option.value === routePermissionPair.route) || null
              }
              options={showPages ? optionsfiles : optionsPages}
              onChange={onChangeRoute}
              isSearchable
              placeholder={showPages ? "Sélectionner une page" : "Sélectionner un fichier"}
              className="w-full rounded-md focus:outline-none focus:border-b-secLightBg z-20 max-h-20"
            />

            <button
              onClick={addRoutePermission}
              className="text-textSecLightColor hover:text-textLightColor font-medium"
            >
              Ajouter
            </button>
          </div>
        </div>
        <div className="p-4  grid grid-flow-row gap-4 max-h-64 overflow-y-auto">
        {selectedRoutes.length > 0 && (
          selectedRoutes.map((pair, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-3 py-3 border-gray-300 shadow-md dark:bg-gray-700 dark:text-white p-2 rounded-lg"
            >
              <span>
                {routes.find((route) => route._id === pair.route)?.title || files.find((route) => route._id === pair.route)?.title} - {pair.permission == "Download" ? "Télécharger" : "pas de téléchargement"}
              </span>
              <button
                onClick={() => removeRoutePermission(index)}
                className="text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>
          )) )}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
            <div onClick={onClose}>

          <Button Text="Annuler"  />
            </div>
            <div onClick={handleSubmit} >

          <Button Text="Créer Groop" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroop;
