import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import Slider from "react-slick";
import { error_toast, sucess_toast } from "@/utils/toastNotification";
import ImageModal from "@/components/ImageModal";
import { useStateContext } from "@/contexts/ContextProvider";
import LoadingScreen from "@/utils/loadingScreen";
import Select from "react-select";

const CreateRoute = (routeId) => {

  const { isLoading, setIsLoading, showNew, setShowNew, setReloadfetch } = useStateContext();
  const [routes, setRoutes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [dataFields, setDataFields] = useState([]);

  const [selectedRoute, setSelectedRoute] = useState({
    parrentPath: "",
    title: "",
    path: "",
    view: "",
    image: "",
    details: "",
    data: {},
  });

  const [selectedParrent, setSelectedParrent] = useState(
  );


  const optionsRoutes = routes.map((route) => ({
    value: route._id,
    label: route.path,
  }));

  const fetchRoutes = async () => {
    try {

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);

      setRoutes(data);

      if (routeId.routeId) {
        const dataWithId = await axios.get(`${import.meta.env.VITE_API_URL}/route/${routeId.routeId}`);

        setSelectedRoute(dataWithId?.data);

      

        const dataWithParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${dataWithId.data.parrentPath}`);



        setSelectedParrent({
          value: dataWithParrent?.data?._id,
          label: dataWithParrent?.data?.path,
        })

        // Ensure data is an object before converting to entries
        const routeData = dataWithId?.data?.data;
        if (routeData && typeof routeData === 'object') {
          setDataFields(Object.entries(routeData).map(([key, value]) => ({ key, value })));
        } else {
          setDataFields([]); // Or handle it as needed if data is null/undefined
        }
      }




    } catch (error) {
      // error_toast(
      //   `Failed to fetch routes: ${error.response ? error.response.data.message : error.message
      //   }`
      // );
      console.error(`Failed to fetch routes: ${error.response ? error.response.data.message : error.message
        }`);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
    // filterdataFields();
  }, []);


  useEffect(() => {
    filterdataFields();

  }, [selectedRoute])

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!?
  const filterdataFields = () => {

   
    if(selectedRoute.view === "TableView"){
      console.log("table view")
    }
    // setDataFields([{ key: "", value: "" }])
    
    
    
    if(selectedRoute.view === "PdfReader"){
      
      console.log("PdfReader view")
    }


  }

  const viewOptions = [
    { name: "View1", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View1.png` },
    { name: "View2", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View2.png` },
    { name: "View3", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View3.png` },
    { name: "View4", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View4.png` },
    { name: "View5", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View5.png` },
    { name: "TableView", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/tableView.png` },
    { name: "PdfReader", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/pfdReader.png` },
  ];

  const handleViewSelection = (viewName) => {
    setSelectedRoute({ ...selectedRoute, view: viewName });
  };

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc);
    setModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      setSelectedRoute({ ...selectedRoute, image: fileName });
    }
  };

  const getImageSrc = (src) => {
    if (src.startsWith('http')) {
      return src;
    }
    return `${import.meta.env.VITE_PUBLIC_URL1}/${src}`;
  };

  // ! .................................................................
  const handleFieldChange = (index, event) => {

    const { name, value } = event.target;

    setDataFields((prevFields) => {

      const updatedFields = [...prevFields];

      updatedFields[index][name] = value;

      const dataObject = updatedFields.reduce((obj, item) => {

        if (item.key && item.value) {

          obj[item.key] = item.value;

        }

        return obj;

      }, {});

      setSelectedRoute(prev => ({ ...prev, data: dataObject }));

      return updatedFields;

    });
  };

  const handleAddField = () => {

    setDataFields([...dataFields, { key: "", value: "" }]);

  };


  const handleRemoveField = (index) => {
    setDataFields((prevFields) => {
      const updatedFields = prevFields.filter((_, i) => i !== index);

      const dataObject = updatedFields.reduce((obj, item) => {
        if (item.key && item.value) {
          obj[item.key] = item.value;
        }
        return obj;
      }, {});

      setSelectedRoute(prev => ({ ...prev, data: dataObject }));
      return updatedFields;
    });
  };




  const handleCreateRoute = async () => {
    try {

      const dataParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${selectedRoute.parrentPath}`);

      const fullPath = `${dataParrent.data.path}${selectedRoute.path}`;
      const dataRoute = { ...selectedRoute, path: fullPath }

      await axios.post(`${import.meta.env.VITE_API_URL}/route`, dataRoute);

      sucess_toast("Route created successfully");

      setSelectedRoute({});
      setReloadfetch(true);
      setShowNew(false);

    } catch (error) {
      error_toast(
        `Failed to create route: ${error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
    }
  };

  const handleUpdateRoute = async () => {
    try {

      const dataParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${selectedRoute.parrentPath}`);

      const fullPath = `${dataParrent.data.path}${selectedRoute.path}`;
      const dataRoute = { ...selectedRoute, path: fullPath }

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/route/${selectedRoute._id}`,
        dataRoute
      );

      sucess_toast("Route updated successfully");


      setSelectedRoute({});
      setReloadfetch(true);
      setShowNew(false);

    } catch (error) {
      error_toast(
        `Failed to create route: ${error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
    }
  };

  const resetForm = () => {
    setSelectedRoute({
      parrentPath: "",
      title: "",
      path: "",
      view: "",
      image: "",
      details: "",
      data: {},
    });
    setDataFields([{ key: "", value: "" }]);
    setShowNew(false);
  };

  const closeDialog = () => {
    resetForm();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#d0d0d0', // Change the background color
      borderColor: !state.isFocused ? '#1c1c1c' : '#0056b3', // Change the border color based on focus state
      '&:hover': {
        borderColor: '#0056b3', // Change the border color on hover
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#1c1c1c', // Change the placeholder color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#1c1c1c', // Change the selected value color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#d0d0d0',
      zIndex: '99',
      // Change the dropdown menu background color
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#0056b3' : '#d0d0d0', // Change the option background color
      color: !state.isSelected ? '#1c1c1c' : 'white', // Change the option text color
      margin: '5px 0',
      '&:hover': {
        backgroundColor: '#0056b3',
        color: "white",
        transition: '0.5s',
      },
    }),
  };

  const onChangeParrentPath = (selectedOption) => {
    console.log("Selected option:", selectedOption);
    setSelectedRoute({
      ...selectedRoute,
      parrentPath: selectedOption.value,
    });
    setSelectedParrent({
      value: selectedOption.value,
      label: selectedOption.label,
    });
  };



  return (
    <>
      {isLoading && <LoadingScreen />}
      <Dialog
        open={showNew}
        onClose={closeDialog}
        maxWidth="md"
        sx={{ "& .MuiDialog-paper": { width: "80%", overflowX: "hidden" } }}
      >
        <DialogTitle className="bg-secLightBg text-textLightColor">

          {routeId.routeId ? "Update Route" : "Create Route"}

        </DialogTitle>
        <DialogContent className="bg-secLightBg" sx={{ overflowY: "scroll" }}>
          {/* <Select
            id="route-select"
            label="Parent Path"
            value={selectedRoute.parrentPath || ""}
            onChange={(e) =>
              setSelectedRoute({
                ...selectedRoute,
                parrentPath: e.target.value,
              })
              }
            placeholder="Parent Path"
            fullWidth
            className="bg-secLightBg w-full"
            inputlabelprops={{ style: { color: "inherit" } }}
            inputprops={{ style: { color: "inherit" } }}
          >
            {Object.values(routes).map((route) => (
              <MenuItem key={route._id} value={route._id}>
                {route.path}
              </MenuItem>
            ))}
          </Select> */}
          <div className="my-4">
            <p className="mb-2">Parrent Route</p>
            <Select
              value={selectedParrent} // Ensure this is correct
              onChange={onChangeParrentPath}
              options={optionsRoutes}
              isSearchable
              placeholder="Rechercher un parent Route"
              styles={customStyles}
              className="w-full rounded-md focus:outline-none focus:border-[#54ad34]"
            />


          </div>

          <div className="my-4">

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
              inputlabelprops={{ style: { color: "inherit" } }}
              inputprops={{ style: { color: "inherit" } }}
            />
            
          </div>
          <div className="m-4">
            <Slider {...settings}>
              {viewOptions.map((option) => (
                <div
                  key={option.name}
                  onClick={() =>
                    handleViewSelection(option.name)
                  }
                  className={`cursor-pointer p-2 rounded-lg border-2 ${selectedRoute.view === option.name
                    ? "border-primary shadow-xl"
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
            inputlabelprops={{ style: { color: "inherit" } }}
            inputprops={{ style: { color: "inherit" } }}
          />
          <div className="my-4">
            <Button variant="contained" component="label" color="primary" className=" bg-secLightBg text-textLightColor w-1/4  " >
              Upload Image

              <input accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleImageUpload}
                className="my-4 bg-secLightBg text-textLightColor" hidden
              />

            </Button>

          </div>
          <div className="my-4">

            {/* Display the image preview */}
            {selectedRoute.image && (
              <div className="mb-4">
                <p className="text-textLightColor">Selected Image Preview:</p>
                <img
                  src={getImageSrc(selectedRoute.image)}
                  alt="Image Preview"
                  className="h-32 object-cover rounded-lg mt-2"
                />
              </div>
            )}
          </div>
          <div className="my-4">

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
              inputlabelprops={{ style: { color: "inherit" } }}
              inputprops={{ style: { color: "inherit" } }}
            />

          </div>

          {/* 
            // ? data fields ********************************************************************************* 
          */}
          {selectedRoute.view == "PdfReader" && 
            <div className="my-4">
            <Button variant="contained" component="label" color="primary" className=" bg-secLightBg text-textLightColor w-1/4  " >
              Upload File

              <input accept="file/*"
                id="contained-button-file"
                type="file"
                // onChange={handleImageUpload}
                className="my-4 bg-secLightBg text-textLightColor" hidden
              />

            </Button>

          </div>
          }
           {/* {selectedRoute.view =="TableView" &&  */}
          <div className="my-4">

            <h4 className="text-textLightColor mb-7">Data Fields</h4>

            {dataFields.map((field, index) => (
              <div key={index} className="flex items-center gap-2 my-7">

                <TextField
                  label={selectedRoute.view =="TableView" ? "Table Column" : "Field Name"}
                  name="key"
                  value={field.key}
                  onChange={(e) => handleFieldChange(index, e)}
                  className="bg-secLightBg"
                  InputLabelProps={{ style: { color: "inherit" } }}
                  InputProps={{ style: { color: "inherit" } }}
                  fullWidth
                />

                
                <TextField
                label="Field Value"
                  name="value"
                  value={field.value}
                  onChange={(e) => handleFieldChange(index, e)}
                  className="bg-secLightBg"
                  InputLabelProps={{ style: { color: "inherit" } }}
                  InputProps={{ style: { color: "inherit" } }}
                  fullWidth
                  />
               

                <Button
                  onClick={() => handleRemoveField(index)}
                  className="text-primary hover:text-darkPrimary "
                >
                  Remove
                </Button>

              </div>
            ))}
            <Button onClick={handleAddField} className="text-primary hover:text-darkPrimary">
              Add Field
            </Button>
          </div>
          {/* } */}
        </DialogContent>
        <DialogActions className="bg-secLightBg">
          <Button onClick={() => closeDialog()} color="primary">
            Cancel
          </Button>
          {routeId.routeId ? (
            <Button onClick={handleUpdateRoute} color="primary">
              Update
            </Button>

          ) : (<Button onClick={handleCreateRoute} color="primary">
            Create
          </Button>)}
        </DialogActions>
      </Dialog>

      {/* Image Modal */}
      {modalOpen && (
        <ImageModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          imgSrc={selectedImage}
        />
      )}
    </>
  );
};

export default CreateRoute;
