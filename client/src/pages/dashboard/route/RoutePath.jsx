import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useStateContext } from "@/contexts/ContextProvider";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDialog from "@/components/ConfirmDialog";
import { sucess_toast, error_toast } from "@/utils/toastNotification";
import CreateRoute from "./CreateRoute";
import Button from "@/components/button";

const Routes = () => {
  const { isLoading, showNew, setShowNew, reloadfetch, setReloadfetch } = useStateContext();
  const [routesData, setRoutesData] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState([]);

  useEffect(() => {
    fetchRoutes();
    setReloadfetch(false);

    const savedVisibilityModel = localStorage.getItem('columnVisibilityModelRoute');
    if (savedVisibilityModel) {
      setColumnVisibilityModel(JSON.parse(savedVisibilityModel));
    }
  }, [reloadfetch, setReloadfetch]);

  const fetchRoutes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
      const dataWithId = data.map((route, index) => ({
        ...route,
        id: index + 1,
      }));
      setRoutesData(dataWithId);
    } catch (error) {
      error_toast(`Échec de la récupération des routes: ${error.response ? error.response.data.message : error.message}`);
      console.error(error);
    }
  };

  const handleDeleteRoute = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/route/${routeToDelete}`);
      sucess_toast("Route supprimée avec succès");
      setRoutesData(prevState => prevState.filter(route => route._id !== routeToDelete));
      handleCloseConfirmDialog();
    } catch (error) {
      error_toast(`Échec de la suppression de la route: ${error.response ? error.response.data.message : error.message}`);
      console.error(error);
    }
  };

  const handleOpenConfirmDialog = (route) => {
    setRouteToDelete(route);
    setOpenConfirmDialog(true);
  };
  
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setRouteToDelete(null);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "path", headerName: "Chemin", flex: 2 },
    { field: "view", headerName: "View", flex: 2 },
    { field: "title", headerName: "Titre", flex: 2 },
    { field: "image", headerName: "Image", flex: 2 },
    { field: "details", headerName: "Détails", flex: 2 },
    { field: "createdAt", headerName: "Créé à", flex: 2 },
    { field: "updatedAt", headerName: "Mis à jour à", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpenDialog(params.row._id)} className="text-primary hover:text-darkPrimary transition-colors duration-300">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleOpenConfirmDialog(params.row._id)} className="text-accent hover:text-darkAccent transition-colors duration-300">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleOpenDialog = (id) => {
    setSelectedRoute(id);
    setShowNew(true);
  };

  const openNewDialog = () => {
    setSelectedRoute("");
    setShowNew(true);
  };

  const handleColumnVisibilityChange = (newModel) => {
    setColumnVisibilityModel(newModel);
    localStorage.setItem('columnVisibilityModelRoute', JSON.stringify(newModel));
  };

  return (
    <div className="pt-11 flex flex-col items-center gap-7">
            <h3 className="text-3xl font-semibold text-textLightColor dark:text-textDarkColor leading-relaxed">
            Gestion des Routes
        </h3>
            <div onClick={openNewDialog}>
              <Button Text="Ajouter" Icon={<AddIcon />} className="bg-primary hover:bg-darkPrimary transition-colors duration-300"/>
            </div>
            
          
          <div className=" mx-7  shadow-2xl dark:shadow-white rounded-lg bg-white dark:bg-mainDarkBg" style={{ height: "600px" ,width:"90%" }} >
            <DataGrid
              rows={routesData}
              columns={columns}
              pageSize={10}
              loading={isLoading}
              disableSelectionOnClick
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={handleColumnVisibilityChange}
              className="text-textLightColor dark:text-gray-100"
              sx={{
                "& .MuiDataGrid-root": {
                  backgroundColor: "#FFFFFF",
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: "#FFFFFF",
                  "&:nth-of-type(even)": {
                    backgroundColor: "#F3F4F6",
                  },
                  "&:hover": {
                    backgroundColor: "#E5E7EB",
                  },
                },
                "& .MuiDataGrid-cell": {
                  color: "#1F2937",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#F9FAFB",
                  color: "#1F2937",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#F9FAFB",
                  color: "#1F2937",
                },
              }}
            />
          </div>

          {/* Create Route Dialog */}
          {showNew && 
            <CreateRoute routeId={selectedRoute} />
          } 
     
 
      
      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleDeleteRoute}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer cette route ? Cette action ne peut pas être annulée."
      />

    </div>
  );
};

export default Routes;
