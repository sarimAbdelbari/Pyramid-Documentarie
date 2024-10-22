import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import {
  error_toast,
  info_toast,
  sucess_toast,
} from "@/utils/toastNotification";
import { FaRegCircleXmark } from "react-icons/fa6";
import CheckButton from "../../../components/checkButton";
import Button from "@/components/button";

const DuplicateGroop = () => {
    const { id } = useParams(); // Get the group ID from the URL
    const navigate = useNavigate(); // For redirection
    const [groopName, setGroopName] = useState("");
    const [routes, setRoutes] = useState([]);
    const [files, setFiles] = useState([]);
  
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
      ?.filter((route) => !selectedRoutes.some((pair) => pair.route === route._id))
      .map((route) => ({
        value: route._id,
        label: route.title,
      }));
  
    const optionsfiles = files
      ?.filter((route) => !selectedRoutes.some((pair) => pair.route === route._id))
      .map((route) => ({
        value: route._id,
        label: route.title,
      }));
  
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
          "http://localhost:5000/api/route/files"
        );
        const responsePages = await axios.get(
          "http://localhost:5000/api/route/pages"
        );
        const responseUsers = await axios.get("http://localhost:5000/api/users");
  
        setFiles(responseFiles.data);
        setRoutes(responsePages.data);
        setUsers(responseUsers.data);
  
        if (id) {
          const responseGroop = await axios.get(
            `http://localhost:5000/api/groop/${id}`
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
              route.route.view.includes("ExcelReader")
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
    }, [id]);
  
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
   
  
        
      await axios.post("http://localhost:5000/api/groop", {
        groopName,
        groopUsers: selectedUsers.map((user) => user.value),
        groopRoutes: selectedRoutes,
      });

      
      setGroopName("");
      setSelectedRoutes([]);
      setSelectedUsers([]);
  
        sucess_toast("Groop updated successfully");
        navigate("/dashboard/groop/table"); // Redirect to the table page
        
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


  return (
    <div className="pt-7 min-h-screen">
      <div className="relative bg-white dark:bg-mainDarkBg dark:shadow-white flex justify-center flex-col gap-9 items-center py-4 px-8 shadow-xl m-8 rounded-xl">
        <p className="text-3xl text-textLightColor dark:text-textDarkColor font-semibold">
         Cloner le groupe
        </p>
        <FaRegCircleXmark
          onClick={() => navigate(-1)}
          className="absolute top-5 right-5 text-2xl text-textLightColor dark:text-textDarkColor cursor-pointer"
        />

        <div className="w-full flex flex-col gap-5 justify-center items-center">
          <input
            type="text"
            placeholder="Nom du groupe"
            className="w-full border border-gray-300 rounded-lg p-2 mt-4"
            value={groopName}
            onChange={(e) => setGroopName(e.target.value)}
          />
          <div className="my-4 flex flex-col justify-center items-center gap-7 w-full">
            <p className="mb-2 text-2xl font-normal">Users</p>
            <Select
              value={selectedUsers}
              onChange={setSelectedUsers}
              options={optionsUsers}
              isSearchable
              isMulti={true}
              placeholder="Sélectionner les utilisateurs"
              className="w-full rounded-md focus:outline-none focus:border-b-secLightBg z-40 max-h-20"
            />
            <p className="mb-2 text-2xl font-normal">Route et Autorisation</p>
            <div className="w-full ">
              <div className="w-fit" onClick={() => changeType(showPages)}>
                <CheckButton Text="ShowPages" Checked={showPages} />
              </div>
            </div>
            <div className="flex  gap-4 w-full bg-mainLightBg dark:bg-mainDarkBg rounded-lg px-4 py-6">
              {showPages ? null : (
                <Select
                  value={
                    optionsPermmissions.find(
                      (option) =>
                        option.value === routePermissionPair.permission
                    ) || null
                  }
                  options={optionsPermmissions}
                  onChange={(selected) =>
                    setRoutePermissionPair((prev) => ({
                      ...prev,
                      permission: selected.value,
                    }))
                  }
                  isSearchable
                  placeholder="Sélectionner une autorisation"
                  className="w-full rounded-md focus:outline-none focus:border-b-secLightBg z-30 max-h-20"
                />
              )}
              <Select
                value={
                  showPages
                    ? optionsPages.find(
                        (option) => option.value === routePermissionPair.route
                      ) || null
                    :  optionsfiles.find(
                        (option) => option.value === routePermissionPair.route
                      ) || null
                }
                onChange={(selected) =>
                  setRoutePermissionPair((prev) => ({
                    ...prev,
                    route: selected.value,
                  }))
                }
                options={showPages ? optionsPages :  optionsfiles }
                isSearchable
                placeholder={
                  showPages
                    ? "Sélectionner une page"
                    : "Sélectionner un fichier"
                }
                className="w-full rounded-md focus:outline-none focus:border-b-secLightBg z-30 max-h-20"
              />
              <button
                onClick={addRoutePermission}
                className="text-textSecLightColor hover:text-textLightColor font-medium"
              >
                Ajouter
              </button>
            </div>
            <div className="w-full">
              <div className="w-full">
                {selectedRoutes.map((pair, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-secLightBg p-2 rounded-lg mb-2"
                  >
                    <span>
                      {routes.find((route) => route._id === pair.route)?.title || files.find((route) => route._id === pair.route)?.title}{" "}-{" "}
                      {pair.permission == "Download"
                        ? "Télécharger"
                        : "pas de téléchargement"}
                    </span>
                    <button
                      onClick={() => removeRoutePermission(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div onClick={() => handleSubmit()}> 

            <Button Text="Créer Groop" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DuplicateGroop