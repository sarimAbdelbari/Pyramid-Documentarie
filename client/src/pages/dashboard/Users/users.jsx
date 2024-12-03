import { useContext, useEffect, useState } from "react";
import { DataGrid   } from "@mui/x-data-grid";
import { useStateContext } from "@/contexts/ContextProvider";
import axios from "axios";
import Button from "@/components/button";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { sucess_toast, error_toast } from "@/utils/toastNotification";
import { ThemeContext } from '@/contexts/themeProvider';
import CreateUser from "@/pages/dashboard/Users/CreateUser"; // Import CreateUser component
import { FaUncharted } from "react-icons/fa6";
import { LuUserCheck2 } from "react-icons/lu";
import { LuUserX2 } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { CiCircleCheck } from "react-icons/ci";
import { LiaUsersSolid } from "react-icons/lia";

const Users = () => {
  const { isLoading ,setIsLoading} = useStateContext();
  const [usersData, setUsersData] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState([]);
  const [groopList, setGroopList] = useState([]);
  const [usersStats, setUsersStats] = useState({});

  const { theme } = useContext(ThemeContext);

  const groopOptions = groopList.map((groop) => ({
    value: groop._id,
    label: groop.groopName,
  }));


  useEffect(() => {
    fetchUsers();
    const savedVisibilityModel = localStorage.getItem("columnVisibilityModelUsers");
    if (savedVisibilityModel) {
      setColumnVisibilityModel(JSON.parse(savedVisibilityModel));
    }
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data: usersData } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      const { data: groopData } = await axios.get(`${import.meta.env.VITE_API_URL}/groop`);

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/stats/user`);

      setUsersStats(response.data);

      setGroopList(groopData);

      const dataWithId = usersData?.map((user, index) => ({
        ...user,
        id: index + 1,
      }));

      setUsersData(dataWithId);
    } catch (error) {
      setIsLoading(false);
      error_toast("Impossible de récupérer les utilisateurs");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`h${import.meta.env.VITE_API_URL}/users/${userToDelete._id}`);
      sucess_toast("L'utilisateur a été supprimé avec succès");
      setUsersData((prevState) =>
        prevState.filter((user) => user._id !== userToDelete._id)
      );
      handleCloseConfirmDialog();
    } catch (error) {
      setIsLoading(false);
      error_toast("Impossible de supprimer l'utilisateur");
      console.error(error);
    } finally{
      setIsLoading(false)
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "userName", headerName: "Nom d'utilisateur", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "groop",
      headerName: "Group",
      flex: 2,
      renderCell: (params) => {
        const groopLabels = (params.row.groop || [])
          .map((groopId) => groopOptions.find((option) => option.value === groopId)?.label)
          .filter((label) => label);
        return groopLabels.map((label, index) => (
          <span key={index} className="bg-primary p-2 mx-2 text-white dark:bg-darkPrimary dark:text-gray-100 rounded-xl">
            {label || "No Group"}
          </span>
        ));
      },
    },
    {
      field: "active",
      headerName: "Actif",
      flex: 1,
      renderCell: (params) => (params.row.active ? <CiCircleCheck className="text-2xl my-auto h-full text-green-800 font-bold" /> : null),
    },
    {
      field: "admin",
      headerName: "Admin",
      flex: 1,
      renderCell: (params) => (params.row.admin ? <CiCircleCheck className="text-2xl my-auto h-full text-yellow-600 font-bold" /> : null),
    },
    { field: "createdAt", headerName: "Créé à", flex: 1 },
    { field: "updatedAt", headerName: "Mis à jour à", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center gap-3 justify-center h-full">
          <CiEdit
            onClick={() => handleEditUser(params.row)}
            className="text-primary dark:text-textDarkColor hover:text-darkPrimary dark:hover:text-primary duration-300 text-2xl cursor-pointer hover:scale-125 ease-in-out"
          />
          <AiOutlineDelete
            onClick={() => handleOpenConfirmDialog(params.row)}
            className="text-accent dark:text-textDarkColor hover:text-darkAccent dark:hover:text-red-500 duration-300 text-2xl cursor-pointer hover:scale-125 ease-in-out"
          />
        </div>
      ),
    },
  ];

  const handleOpenConfirmDialog = (user) => {
    setUserToDelete(user);
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
  };

  const handleEditUser = (user) => {

    setUserToEdit(user);
    setShowCreateUserModal(true);
  };

  const handleCloseCreateUserModal = () => {
    setShowCreateUserModal(false);
    setUserToEdit(null);
  };

  const handleColumnVisibilityChange = (newModel) => {
    setColumnVisibilityModel(newModel);
    localStorage.setItem("columnVisibilityModelUsers", JSON.stringify(newModel));
  };


  return (
    <>
      <div className="flex flex-col items-center gap-3 bg-white dark:bg-secDarkBg py-4 px-5 rounded-3xl">
        <h3 className="text-3xl font-semibold text-textLightColor dark:text-textDarkColor leading-relaxed">
          Utilisateurs
        </h3>
        <div onClick={() => setShowCreateUserModal(true)}>
          <Button Text="Crée un utilisateur" />
        </div>
        <div className="w-full">
  <div className=" shadow-2xl bg-lightCyen dark:shadow-white rounded-lg dark:bg-mainDarkBg flex justify-around items-center flex-wrap gap-4 p-5 ">
    {/* Active Users */}
    <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center gap-3 text-green-600 dark:text-green-400 text-lg font-semibold">
        <p className="text-lg text-textLightColor">Nombre de  Utilisateurs</p>
        <FaUncharted className="text-xl text-textLightColor" />
      </div>
      <div className="flex items-center gap-4 text-xl font-medium text-blue-600 dark:text-blue-400">
        <LiaUsersSolid  />
        <p>{usersStats?.totalUsers}</p>
      </div>
    </div>
    <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center gap-3 text-green-600 dark:text-green-400 text-lg font-semibold">
        <p className="text-lg text-textLightColor">Utilisateurs actifs</p>
        <FaUncharted className="text-xl text-textLightColor" />
      </div>
      <div className="flex items-center gap-4 text-xl font-medium text-green-600 dark:text-green-400">
        <LuUserCheck2 />
        <p>{usersStats?.active}</p>
      </div>
    </div>
    
    {/* Deactivated Users */}
    <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center gap-3  text-red-500 dark:text-red-300 text-lg font-semibold">
        <p className="text-lg text-textLightColor">Utilisateurs Désactivent</p>
        <FaUncharted className="text-xl text-textLightColor" />
      </div>
      <div className="flex items-center gap-4 text-xl font-medium text-red-600 dark:text-red-400">
        <LuUserX2 />
        <p>{usersStats?.disActive}</p>
      </div>
    </div>

    {/* Common Group */}
    <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center gap-3 text-purple-500 dark:text-purple-300 text-lg font-semibold">
        <p className="text-lg text-textLightColor">Groupe commun</p>
        <FaUncharted className="text-xl text-textLightColor" />
      </div>
      <div className="flex items-center gap-4 text-xl font-medium text-purple-600 dark:text-purple-400">
        <TbUsersGroup />
        <p>{usersStats?.numberOftheMostCommunGroop} {usersStats?.most_common_groop?.groopName}</p>
      </div>
    </div>

    {/* Admin Accounts */}
    <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center gap-3 text-yellow-500 dark:text-yellow-300 text-lg font-semibold">
        <p className="text-lg text-textLightColor">Comptes administrateur</p>
        <FaUncharted className="text-xl text-textLightColor" />
      </div>
      <div className="flex items-center gap-4 text-xl font-medium text-yellow-600 dark:text-yellow-400">
        <RiAdminFill />
        <p>{usersStats?.admins}</p>
      </div>
    </div>
  </div>
</div>


   
      <div className="w-full">
      <div className=" shadow-2xl bg-lightCyen dark:shadow-white rounded-lg  dark:bg-mainDarkBg py-2" style={{ height: "600px"  }}>
          <DataGrid
            rows={usersData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            checkboxSelection={false}
            loading={isLoading}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleColumnVisibilityChange}
            // localeText={frFRCore}
            className="m-4 border-none text-textLightColor dark:text-gray-100 "
            sx={{
              "& .MuiDataGrid-root": {
                backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
              },
              "& .MuiDataGrid-row": {
                backgroundColor: theme === "dark" ? "#1E293B" : "#FFFFFF",
                "&:nth-of-type(even)": {
                  backgroundColor: theme === "dark" ? "#111827" : "#F3F4F6",
                },
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#334155" : "#E5E7EB",
                },
              },
              "& .MuiDataGrid-cell": {
                color: theme === "dark" ? "#F9FAFB" : "#1F2937",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#1E293B" : "#F9FAFB",
                color: theme === "dark" ? "#F9FAFB" : "#1F2937",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#1E293B" : "#F9FAFB",
                color: theme === "dark" ? "#F9FAFB" : "#1F2937",
              },
            }}
          />
        </div>
      </div>
        
      </div>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 px-11 py-9 rounded-2xl shadow-lg dark:shadow-white">
            <h2 className="text-xl font-semibold dark:text-white">
              Confirmer la suppression
            </h2>
            <p className="mt-4 text-textLightColor dark:text-gray-300">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-semibold text-primary dark:text-darkPrimary">
                {userToDelete?.userName}
              </span>{" "}
              ?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCloseConfirmDialog}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded hover:bg-red-700 dark:hover:bg-red-400"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
      {showCreateUserModal && (
        <>
        <CreateUser
          user={userToEdit}
          onClose={handleCloseCreateUserModal}
          onSave={() => {
            fetchUsers(); // Refresh user list after saving
            handleCloseCreateUserModal();
          }}
          />
      </>
      )}
    </>
  );
};

export default Users;
