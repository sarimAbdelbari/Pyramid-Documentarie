import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import Slider from "react-slick";
import { error_toast } from "@/utils/toastNotification";
import ImageModal from "@/components/ImageModal"; // Import the ImageModal component

const CreateRoute = ({
  open,
  handleClose,
  dialogType,
  selectedRoute,
  setSelectedRoute,
  handleCreateOrUpdate,
}) => {
  const [routes, setRoutes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
      setRoutes(data);
    } catch (error) {
      error_toast(
        `Failed to fetch routes: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
    }
  };

  const viewOptions = [
    { name: "View1", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View1.png` },
    { name: "View2", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View2.png` },
    { name: "View3", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View3.png` },
    { name: "View4", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View4.png` },
    { name: "View5", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View5.png` },
  ];

  const handleViewSelection = (viewName) => {
    setSelectedRoute({ ...selectedRoute, view: viewName });
  };

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc); // Set selected image source
    setModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name; // Get the file name with extension
      setSelectedRoute({ ...selectedRoute, image: fileName });

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        sx={{ "& .MuiDialog-paper": { width: "80%", overflowX: "hidden" } }} // Custom width
      >
        <DialogTitle className="bg-secLightBg text-textLightColor ">
          {dialogType === "create" ? "Create Route" : "Update Route"}
        </DialogTitle>
        <DialogContent 
          className="bg-secLightBg"
          sx={{ overflow: 'hidden' }} // Remove the scrollbar
        >
          <Select
  id="route-select"
  label="Parent Path"
  value={selectedRoute.parrentPath || "/" }
  onChange={(e) =>
    setSelectedRoute({
      ...selectedRoute,
      parrentPath: e.target.value,
    })
  }
  placeholder="Parent Path"
  fullWidth
  className="bg-secLightBg w-full"
  InputLabelProps={{ style: { color: "inherit" } }}
  InputProps={{ style: { color: "inherit" } }}
>
  {routes.map((route) => (
    <MenuItem
      key={route._id}
      value={route._id}
    >
      {route.path}
    </MenuItem>
  ))}
</Select>

          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={selectedRoute.title}
            onChange={(e) =>
              setSelectedRoute({ ...selectedRoute, title: e.target.value })
            }
            className="bg-secLightBg"
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <TextField
            margin="dense"
            label="Path"
            type="text"
            fullWidth
            value={selectedRoute.path || "/"}
            onChange={(e) =>
              setSelectedRoute({ ...selectedRoute, path: e.target.value })
            }
            className="bg-secLightBg"
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
          <div className="m-4">
            <Slider {...settings}>
              {viewOptions.map((option) => (
                <div
                  key={option.name}
                  onClick={() =>
                    handleViewSelection(option.name, option.imgSrc)
                  }
                  className={`cursor-pointer p-2 rounded-lg border-2 ${
                    selectedRoute.view === option.name
                      ? "border-primary shadow-lg"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={option.imgSrc}
                    alt={option.name}
                    className="w-full h-32 object-cover rounded-lg"
                    onClick={() => handleImageClick(option.imgSrc)}
                  />
                  <p className="text-center mt-2">{option.name}</p>
                </div>
              ))}
            </Slider>
          </div>
          {/* File Input for Image Selection */}
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleImageUpload}
            className="mb-4 bg-secLightBg text-textLightColor"
          />
          {/* Display the image preview */}
          {imagePreview && (
            <div className="mb-4">
              <p className="text-textLightColor">Selected Image Preview:</p>
              <img
                src={imagePreview}
                alt="Image Preview"
                className="h-32 object-cover rounded-lg mt-2"
              />
            </div>
          )}
          <TextField
            margin="dense"
            label="Details"
            type="text"
            fullWidth
            value={selectedRoute.details}
            onChange={(e) =>
              setSelectedRoute({ ...selectedRoute, details: e.target.value })
            }
            className="bg-secLightBg"
            InputLabelProps={{ style: { color: "inherit" } }}
            InputProps={{ style: { color: "inherit" } }}
          />
        </DialogContent>
        <DialogActions className="bg-secLightBg">
          <Button
            onClick={handleClose}
            className="text-primary hover:text-darkPrimary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateOrUpdate}
            className="text-primary hover:text-darkPrimary"
          >
            {dialogType === "create" ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
      <ImageModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        imgSrc={selectedImage}
      />
    </>
  );
};

export default CreateRoute;
