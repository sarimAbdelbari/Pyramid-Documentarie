import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/button";
import Select from "react-select";
import { sucess_toast, error_toast } from "@/utils/toastNotification";
import CheckButton from "@/components/checkButton";

const CreateUser = ({ onClose, user }) => {
  const [selectedUser, setSelectedUser] = useState(user || {
    userName: "",
    email: "",
    password: "",
    active: false,
    admin: false,
    groop: []
  });

  const [groopOptions, setGroopOptions] = useState([]);
  
  useEffect(() => {
    const fetchGroopOptions = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/groop`);
        setGroopOptions(data.map(groop => ({ value: groop._id, label: groop.groopName })));
      } catch (error) {
        console.error("Failed to fetch groops", error);
      }
    };

    fetchGroopOptions();
  }, []);



  const onSelectGroop = (selectedOptions) => {
    const selectedGroopIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedUser({ ...selectedUser, groop: selectedGroopIds });
  };

  const handleCreateUser = async () => {
    try {
       await axios.post(`${import.meta.env.VITE_API_URL}/users`, selectedUser);

      sucess_toast("Utilisateur créé avec succès");

      onClose();

    } catch (error) {
      error_toast("Échec de la création de l'utilisateur");
      console.error(error);
    }
  };

  const handleUpdateUser = async () => {
    try {

      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${selectedUser._id}`, selectedUser);
   
      sucess_toast("Mise à jour de l'utilisateur réussie");

      onClose();
      
    } catch (error) {
      error_toast("Échec de la mise à jour de l'utilisateur");
      console.error(error);
    }
  };

  // if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 shadow-xl flex items-center justify-center z-50 p-3 md:p-5 lg:p-7">
      <div className="bg-white dark:bg-gray-800 px-11 py-9 rounded-2xl shadow-lg dark:shadow-white w-full max-w-lg h-full overflow-y-auto flex flex-col justify-between">
        <h2 className="text-xl font-semibold dark:text-white mb-4">
          {!user ? "Créer un utilisateur" : "Mettre à jour l'utilisateur"}
        </h2>
        <div className="mb-4">
          <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Nom D&apos;utilisateur</label>
          <input
            type="text"
            value={selectedUser.userName}
            onChange={(e) => setSelectedUser({ ...selectedUser, userName: e.target.value })}
            className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={selectedUser.email}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe</label>
          <input
            type="password"
            value={selectedUser.password}
            onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
            className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>

       <CheckButton Text="Actif" Checked={selectedUser.active} onChange={(e) => setSelectedUser({ ...selectedUser, active: e.target.checked })}/>
        </div>
        <div>

       <CheckButton Text="Admin" Checked={selectedUser.admin} onChange={(e) => setSelectedUser({ ...selectedUser, admin: e.target.checked })}/>
        </div>
      
       
        <Select
          isMulti
          value={groopOptions.filter(option => selectedUser.groop.includes(option.value))}
          onChange={onSelectGroop}
          options={groopOptions}
          placeholder="Sélectionner un ou plusieurs rôles"
          className="mt-4 z-20"
        />
        <div className="mt-6 flex justify-end space-x-4">
          <div onClick={onClose}>

          <Button  Text="Annuler"/>
          </div>
          <div onClick={!user ? handleCreateUser : handleUpdateUser}>

            <Button
              Text={!user ? "Créer" : "Mise à jour"}
            />
          </div>
            
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
