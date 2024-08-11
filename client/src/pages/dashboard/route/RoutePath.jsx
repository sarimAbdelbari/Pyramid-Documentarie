import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useStateContext } from "@/contexts/ContextProvider";
import axios from "axios";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CreateRoute from "./CreateRoute"; // Import the new component
import ConfirmDialog from "@/components/ConfirmDialog";
import { sucess_toast, error_toast } from "@/utils/toastNotification";

const Routes = () => {
  const { isLoading } = useStateContext();
  const [routesData, setRoutesData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedRoute, setSelectedRoute] = useState({
    parrentPath:"",
    title:"",
    path: "",
    view: "",
    image: "",
    details: "",
    data : {},
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
      const dataWithId = data.map((route, index) => ({
        ...route,
        id: index + 1,
      }));
      setRoutesData(dataWithId);
    } catch (error) {
      error_toast(
        `Failed to create route: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
    }
  };

  const handleCreateRoute = async () => {
    try {
       
      const  dataParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${selectedRoute.parrentPath}`);
      
      const dataRoute = {...selectedRoute , path: `${dataParrent.data.path}${selectedRoute.path}`}

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/route`,
        dataRoute
      );
      sucess_toast("Route created successfully");
      setRoutesData((prevState) => [
        ...prevState,
        { ...data, id: prevState.length + 1 },
      ]);
      handleCloseDialog();
    } catch (error) {
      error_toast(
        `Failed to create route: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
    }
  };

  const handleUpdateRoute = async () => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/route/${selectedRoute._id}`,
        selectedRoute
      );
      sucess_toast("Route updated successfully");
      setRoutesData((prevState) =>
        prevState.map((route) =>
          route._id === data._id ? { ...data, id: route.id } : route
        )
      );
      handleCloseDialog();
    } catch (error) {
      error_toast(
        `Failed to create route: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
    }
  };

  const handleDeleteRoute = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/route/${routeToDelete}`
      );      
      sucess_toast("Route deleted successfully");
      setRoutesData((prevState) =>
        prevState.filter((route) => route._id !== routeToDelete)
      );
      handleCloseConfirmDialog();
      fetchRoutes();
    } catch (error) {
      error_toast(
        `Failed to create route: ${
          error.response ? error.response.data.message : error.message
        }`
      );
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
    { field: "path", headerName: "Path", flex: 2 },
    { field: "view", headerName: "View", flex: 2 },
    { field: "image", headerName: "Image", flex: 2 },
    { field: "details", headerName: "Details", flex: 2 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleOpenDialog("update", params.row)}
            className="text-primary hover:text-darkPrimary transition-colors duration-300"
          >
            <EditIcon />
          </IconButton>
          <IconButton
           
            onClick={() => handleOpenConfirmDialog(params.row._id)}
            className="text-accent hover:text-darkAccent transition-colors duration-300"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleOpenDialog = (type, route = null) => {
    setDialogType(type);
    setSelectedRoute(
      route || {
        parrentPath:"",
        title:"",
        path: "",
        view: "",
        image: "",
        details: "",
        data:{},
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoute({});
  };

  return (
    <div className="flex flex-col flex-grow h-screen">
      <Navbar />
      <div className="flex flex-grow overflow-hidden">
        <SideBar />
        <div className="flex-grow p-6 overflow-auto pt-28">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-primary">
              Routes Management
            </h1>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog("create")}
              className="bg-primary hover:bg-darkPrimary transition-colors duration-300"
            >
              Add Route
            </Button>
          </div>
          <div className=" flex justify-center items-center">
            <DataGrid
              rows={routesData}
              columns={columns}
              pageSize={10}
              autoHeight
              loading={isLoading}
              disableSelectionOnClick
              disableColumnMenu
            />
          </div>
          {openDialog && 
          <CreateRoute
            open={openDialog}
            handleClose={handleCloseDialog}
            dialogType={dialogType}
            selectedRoute={selectedRoute}
            setSelectedRoute={setSelectedRoute}
            handleCreateOrUpdate={
              dialogType === "create" ? handleCreateRoute : handleUpdateRoute
            }
          />
          }
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleDeleteRoute}
        title="Confirm Deletion"
        message="Are you sure you want to delete this route? This action cannot be undone."
      />
    </div>
  );
};

export default Routes;
