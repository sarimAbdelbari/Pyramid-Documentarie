import { useState, useEffect } from "react";
import { useStateContext } from "@/contexts/ContextProvider";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button as MUIButton } from "@mui/material";
import axios from "axios";
import Button from "../../../components/button";
import {sucess_toast ,error_toast} from '@/utils/toastNotification'
const CreateRoute = () => {
  const { setShowNew , setReloadfetch } = useStateContext();
  const [openDialog, setOpenDialog] = useState(true);
  const [routesData, setRoutesData] = useState([]);
  const [dialogType, setDialogType] = useState("create");
  const [selectedRoute, setSelectedRoute] = useState({
    path: "/",
    view: "",
    data: {}
  });

  const handleCloseDialog = () => {
    setShowNew(false);
    setOpenDialog(false);
  };

  const handleCreateRoute = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/route`,
        selectedRoute
      );
      setRoutesData((prevState) => [
        ...prevState,
        { ...data, id: prevState.length + 1 },
      ]);
      setReloadfetch(true);
      sucess_toast("Route created successfully");
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

  const handleDataChange = (category, key, value) => {
    setSelectedRoute((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [category]: {
          ...prev.data[category],
          [key]: value,
        },
      },
    }));
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle className="bg-secLightBg text-textLightColor">
        {dialogType === "create" ? "Create Route" : "Update Route"}
      </DialogTitle>
      <DialogContent className="bg-secLightBg text-textLightColor">
        <TextField
          label="Path"
          fullWidth
          margin="normal"
          value={selectedRoute.path || "/"}
          placeholder="/"
          onChange={(e) =>
            setSelectedRoute({ ...selectedRoute, path: e.target.value })
          }
        />
        <TextField
          label="View"
          fullWidth
          margin="normal"
          value={selectedRoute.view}
          onChange={(e) =>
            setSelectedRoute({ ...selectedRoute, view: e.target.value })
          }
        />
        {Object.keys(selectedRoute.data).map((category) => (
          <div key={category} className="mb-4">
            <h4 className="font-semibold text-textSecLightColor">{category}</h4>
            <TextField
              label="Image"
              fullWidth
              margin="normal"
              value={selectedRoute.data[category].Image}
              onChange={(e) =>
                handleDataChange(category, 'Image', e.target.value)
              }
            />
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={selectedRoute.data[category].Title}
              onChange={(e) =>
                handleDataChange(category, 'Title', e.target.value)
              }
            />
            <TextField
              label="Link"
              fullWidth
              margin="normal"
              value={selectedRoute.data[category].Link || "/"}
              placeholder="/"
              onChange={(e) =>
                handleDataChange(category, 'Link', e.target.value)
              }
            />
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={selectedRoute.data[category].Name}
              placeholder="/"
              onChange={(e) =>
                handleDataChange(category, 'Name', e.target.value)
              }
            />
            <TextField
              label="Details"
              fullWidth
              margin="normal"
              value={selectedRoute.data[category].Details}
              onChange={(e) =>
                handleDataChange(category, 'Details', e.target.value)
              }
            />
            <TextField
              label="Permission"
              fullWidth
              margin="normal"
              value={selectedRoute.data[category].Permission}
              onChange={(e) =>
                handleDataChange(category, 'Permission', e.target.value)
              }
            />
          </div>
        ))}
        <div onClick={() =>
            setSelectedRoute((prev) => ({
              ...prev,
              data: {
                ...prev.data,
                [`data Name ${Object.keys(prev.data).length + 1}`]: {
                  Image: "",
                  Title: "",
                  Name: "",
                  Link: "",
                  Details: "",
                  Permission: "",
                },
              },
            }))
          }>

        <Button
          Text="Add SubRoute"
          />
        
          </div>
      </DialogContent>
      <DialogActions>
        <MUIButton onClick={handleCloseDialog} color="primary">
          Cancel
        </MUIButton>
        <MUIButton
          onClick={dialogType === "create" ? handleCreateRoute : handleUpdateRoute}
          color="primary"
        >
          {dialogType === "create" ? "Create" : "Update"}
        </MUIButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoute;
