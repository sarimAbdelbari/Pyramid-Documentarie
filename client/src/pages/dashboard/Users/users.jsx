import { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useStateContext } from "@/contexts/ContextProvider";
import axios from "axios";
import Button from "@/components/button";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { sucess_toast, error_toast } from "@/utils/toastNotification";
import { ThemeContext } from '@/components/themeProvider';
import CreateUser from "./CreateUser"; // Import CreateUser component

const Users = () => {
  const { isLoading } = useStateContext();
  const [usersData, setUsersData] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState([]);
  const [groopList, setGroopList] = useState([]);

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
      const { data: usersData } = await axios.get("http://localhost:5000/api/users");
      const { data: groopData } = await axios.get("http://localhost:5000/api/groop");

      setGroopList(groopData);

      const dataWithId = usersData?.map((user, index) => ({
        ...user,
        id: index + 1,
      }));

      setUsersData(dataWithId);
    } catch (error) {
      error_toast("Impossible de récupérer les utilisateurs");
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userToDelete._id}`);
      sucess_toast("L'utilisateur a été supprimé avec succès");
      setUsersData((prevState) =>
        prevState.filter((user) => user._id !== userToDelete._id)
      );
      handleCloseConfirmDialog();
    } catch (error) {
      error_toast("Impossible de supprimer l'utilisateur");
      console.error(error);
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
      renderCell: (params) => (params.row.active ? "Oui" : "Non"),
    },
    {
      field: "admin",
      headerName: "Admin",
      flex: 1,
      renderCell: (params) => (params.row.admin ? "Oui" : "Non"),
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
      <div className="pt-10 flex flex-col items-center gap-6">
        <h3 className="text-3xl font-semibold text-textLightColor dark:text-textDarkColor leading-relaxed">
          Utilisateurs
        </h3>

        <div onClick={() => setShowCreateUserModal(true)}>
          <Button Text="Crée un utilisateur" />
        </div>
      
   

        <div className=" mx-7  shadow-2xl dark:shadow-white rounded-lg bg-white dark:bg-mainDarkBg" style={{ height: "600px" ,width:"90%" }}>
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
