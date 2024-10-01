import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/button";
import Select from "react-select";
import { sucess_toast, error_toast } from "@/utils/toastNotification";

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
        const { data } = await axios.get("http://localhost:5000/api/groop");
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
       await axios.post("http://localhost:5000/api/users", selectedUser);

      sucess_toast("Utilisateur créé avec succès");

      onClose();

    } catch (error) {
      error_toast("Échec de la création de l'utilisateur");
      console.error(error);
    }
  };

  const handleUpdateUser = async () => {
    try {

      await axios.patch(`http://localhost:5000/api/users/${selectedUser._id}`, selectedUser);
   
      sucess_toast("Mise à jour de l'utilisateur réussie");

      onClose();
      
    } catch (error) {
      error_toast("Échec de la mise à jour de l'utilisateur");
      console.error(error);
    }
  };

  // if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 shadow-xl flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 px-11 py-9 rounded-2xl shadow-lg dark:shadow-white w-full max-w-lg">
        <h2 className="text-xl font-semibold dark:text-white mb-4">
          {!user ? "Créer un utilisateur" : "Mettre à jour l'utilisateur"}
        </h2>
        <div className="mb-4">
          <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Nom d'utilisateur</label>
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
       

        <div className="mb-4 flex gap-4">
        <div className="inline-flex items-center ">
  <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
    <input type="checkbox"
      checked={selectedUser.admin}
      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
      id="check-2" 
      onChange={(e) => setSelectedUser({ ...selectedUser, admin: e.target.checked })}
      />
    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transhtmlF -translate-x-1/2 -translate-y-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
        stroke="currentColor" strokeWidth="1">
        <path fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"></path>
      </svg>
    </span>
  </label>
  <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="check-2">
  Admin
  </label>
</div>
        <div className="inline-flex items-center">
  <label className="flex items-center cursor-pointer relative" htmlFor="check-3">
    <input type="checkbox"
      checked={selectedUser.active}
      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
      id="check-3" 
      onChange={(e) => setSelectedUser({ ...selectedUser, active: e.target.checked })}
      />
    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transhtmlF -translate-x-1/2 -translate-y-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
        stroke="currentColor" strokeWidth="1">
        <path fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"></path>
      </svg>
    </span>
  </label>
  <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="check-3">
  Actif
  </label>
</div>
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
