import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import SideBar from "../../../components/sidebar";
import "react-data-grid/lib/styles.css";
import { DataGrid } from "@mui/x-data-grid";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { sucess_toast, error_toast } from "../../../utils/toastNotification";

const Routes = () => {
  const { isLoading } = useStateContext();
  const [routesData, setRoutesData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedRoute, setSelectedRoute] = useState({
    path: "",
    view: "",
    data: {},
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/route");
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
      const { data } = await axios.post(
        "http://localhost:5000/api/route",
        selectedRoute
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
        `http://localhost:5000/api/route/${selectedRoute._id}`,
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
        `http://localhost:5000/api/route/${routeToDelete._id}`
      );
      sucess_toast("Route deleted successfully");
      setRoutesData((prevState) =>
        prevState.filter((route) => route._id !== routeToDelete._id)
      );
      handleCloseConfirmDialog();
    } catch (error) {
      error_toast(
        `Failed to create route: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "path", headerName: "Path", flex: 2 },
    { field: "view", headerName: "View", flex: 2 },
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
            onClick={() => handleOpenConfirmDialog(params.row)}
            className="text-accent hover:text-darkAccent transition-colors duration-300"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleOpenDialog = (type, route = { path: "", view: "", data: {} }) => {
    setDialogType(type);
    setSelectedRoute(route);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoute({ path: "", view: "", data: {} });
  };

  const handleOpenConfirmDialog = (route) => {
    setRouteToDelete(route);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <div className="min-h-screen bg-mainLightBg dark:bg-mainDarkBg text-textLightColor ">
      <Navbar />
      <SideBar />
      <div className="pt-28 flex flex-col items-center gap-7">
        <h3 className="text-3xl font-semibold text-textLightColor  dark:text-textDarkColor leading-relaxed">
          Routes
        </h3>
        <Button
          variant="contained"
          className="bg-primary hover:bg-darkPrimary text-white shadow-lg rounded-xl"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("create")}
        >
          Create Route
        </Button>
        <div
          className="w-full max-w-7xl  shadow-2xl rounded-lg"
          style={{ height: "600px" }}
        >
          <DataGrid
            rows={routesData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            checkboxSelection={false}
            loading={isLoading}
            className="m-4  border-none bg-[#f9fafb] text-textLightColor "
            sx={{
              "& .MuiDataGrid-row": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1f2937" : "#f9fafb",
                "&:nth-of-type(even)": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#111827" : "#e5e7eb",
                },
                "&:hover:nth-of-type(even)": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#2d3748" : "#e2e8f0",
                },
                "&:hover": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#2d3748" : "#e2e8f0",
                },
              },
              "& .MuiDataGrid-cell": {
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#d1d5db" : "#374151",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#374151" : "#f3f4f6",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#e5e7eb" : "#111827",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#374151" : "#f3f4f6",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#e5e7eb" : "#111827",
              },
            }}
          />
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle className="bg-secLightBg  text-textLightColor ">
          {dialogType === "create" ? "Create Route" : "Update Route"}
        </DialogTitle>
        <DialogContent className="bg-secLightBg  ">
          <TextField
            autoFocus
            margin="dense"
            label="Path"
            type="text"
            fullWidth
            value={selectedRoute.path}
            onChange={(e) =>
              setSelectedRoute({ ...selectedRoute, path: e.target.value })
            }
            className="bg-secLightBg "
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <Select
            id="View"
            label="View"
            value={selectedRoute.view || "View2"}
            onChange={(e) =>
              setSelectedRoute({ ...selectedRoute, view: e.target.value })
            }
            placeholder="view"
            className="bg-secLightBg w-full "
          >
            <MenuItem value="View2">View2</MenuItem>
            <MenuItem value="View3">View3</MenuItem>
            <MenuItem value="View4">View4</MenuItem>
            <MenuItem value="View5">View5</MenuItem>
          </Select>
          {/* <TextField
            margin="dense"
            label="View"
            type="text"
            fullWidth
            value={selectedRoute.view}
            onChange={(e) => setSelectedRoute({ ...selectedRoute, view: e.target.value })}
            className='bg-secLightBg '
            InputLabelProps={{ style: { color: 'inherit' } }}
            InputProps={{ style: { color: 'inherit' } }}
          /> */}
          <TextField
            margin="dense"
            label="Data"
            type="text"
            fullWidth
            value={JSON.stringify(selectedRoute.data, null, 2)}
            onChange={(e) =>
              setSelectedRoute({
                ...selectedRoute,
                data: JSON.parse(e.target.value),
              })
            }
            className="bg-secLightBg "
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
            multiline
            rows={6}
          />
        </DialogContent>
        <DialogActions className="bg-secLightBg">
          <Button
            onClick={handleCloseDialog}
            className="text-primary hover:text-darkPrimary"
          >
            Cancel
          </Button>
          <Button
            onClick={
              dialogType === "create" ? handleCreateRoute : handleUpdateRoute
            }
            className="text-primary hover:text-darkPrimary"
          >
            {dialogType === "create" ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle className="bg-secLightBg text-textLightColor">
          Confirm Delete
        </DialogTitle>
        <DialogContent className="bg-secLightBg text-textLightColor">
          Are you sure you want to delete this route?
        </DialogContent>
        <DialogActions className="bg-secLightBg">
          <Button
            onClick={handleCloseConfirmDialog}
            className="text-primary hover:text-darkPrimary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteRoute}
            className="text-primary hover:text-darkPrimary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Routes;
