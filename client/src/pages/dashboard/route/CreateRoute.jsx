import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Slider from "react-slick";
import { error_toast, sucess_toast } from "@/utils/toastNotification";
import ImageModal from "@/components/ImageModal";
import { useStateContext } from "@/contexts/ContextProvider";
import LoadingScreen from "@/utils/loadingScreen";
import Select from "react-select";

const CreateRoute = ({ routeId }) => {
  const { isLoading, setIsLoading, showNew, setShowNew, setReloadfetch } = useStateContext();
  const [routes, setRoutes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [dataFields, setDataFields] = useState([{ tableCol: "", value: "" }]);
  const [selectedRoute, setSelectedRoute] = useState({
    parrentPath: "",
    title: "",
    path: "",
    view: "",
    image: "",
    details: "",
    data: { tableCol: {} },
  });
  const [selectedParrent, setSelectedParrent] = useState();

  const [parrentData, setParrentData] = useState({});

  const optionsRoutes = routes.map((route) => ({
    value: route._id,
    label: route.path,
  }));


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

  const fetchRoutes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
      setRoutes(data);

      if (routeId) {
        const dataWithId = await axios.get(`${import.meta.env.VITE_API_URL}/route/${routeId}`);
        setSelectedRoute(dataWithId?.data);

        const dataWithParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${dataWithId.data.parrentPath}`);
        setSelectedParrent({
          value: dataWithParrent?.data?._id,
          label: dataWithParrent?.data?.path,
        });
      

        const dataFields = Object.entries(dataWithId?.data?.data.tableCol || {}).map(([tableCol, value]) => ({ tableCol, value }));
        setDataFields(dataFields);
      }

    } catch (error) {
      console.error(`Failed to fetch routes: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);
  


  const handleFieldChange = (index, event, field) => {
    const { value } = event.target;
    setDataFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], [field]: value };
  
      const dataObject = updatedFields.reduce((obj, item) => {
        if (item.tableCol) {
          obj[item.tableCol] = item.value; // Column name as key, value as the content
        }
        return obj;
      }, {});
  
      setSelectedRoute((prev) => ({ ...prev, data: { tableCol: dataObject } }));
      return updatedFields;
    });
  };
  

  const handleRemoveField = (index) => {
    setDataFields((prevFields) => {
      const updatedFields = prevFields.filter((_, i) => i !== index);
  
      const dataObject = updatedFields.reduce((obj, item) => {
        if (item.tableCol) {
          obj[item.tableCol] = item.value; // Column name as key, value as the content
        }
        return obj;
      }, {});
  
      setSelectedRoute((prev) => ({ ...prev, data: { tableCol: dataObject } }));
      return updatedFields;
    });
  };
  

  const handleAddField = () => {
    setDataFields((prevFields) => [
      ...prevFields,
      { tableCol: "", value: "" },  // Initialize with both tableCol and value keys
    ]);
  };
  
  

  const handleCreateRoute = async () => {
    try {
      const dataParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${selectedRoute.parrentPath}`);
      const dataRoute = { ...selectedRoute, path: `${dataParrent.data.path}${selectedRoute.path}` };
      await axios.post(`${import.meta.env.VITE_API_URL}/route`, dataRoute);

      sucess_toast("Route created successfully");

      setSelectedRoute({});
      setShowNew(false);
      setReloadfetch(true);
    } catch (error) {
      error_toast(`Failed to create route: ${error.response ? error.response.data.message : error.message}`);
      console.error(error);
    }
  };

  const handleUpdateRoute = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/route/${selectedRoute._id}`, selectedRoute);
      sucess_toast("Route updated successfully");

      setSelectedRoute({});
      setShowNew(false);
      setReloadfetch(true);
    } catch (error) {
      error_toast(`Failed to update route: ${error.response ? error.response.data.message : error.message}`);
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
      data: { tableCol: {} },
    });
    setDataFields([{ tableCol: "", value: "" }]);
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
      backgroundColor: '#d0d0d0',
      borderColor: !state.isFocused ? '#1c1c1c' : '#0056b3',
      '&:hover': {
        borderColor: '#0056b3',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#1c1c1c',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#1c1c1c',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#d0d0d0',
      zIndex: '99',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#0056b3' : '#d0d0d0',
      color: !state.isSelected ? '#1c1c1c' : 'white',
      margin: '5px 0',
      '&:hover': {
        backgroundColor: '#0056b3',
        color: "white",
        transition: '0.5s',
      },
    }),
  };

  const parrentSData = async (id) =>{
    const dataWithId = await axios.get(`${import.meta.env.VITE_API_URL}/route/${id}`);
    setParrentData(dataWithId.data)
  }

  const onChangeParrentPath = async (selectedOption) => {
    setSelectedRoute({
      ...selectedRoute,
      parrentPath: selectedOption.value,
    });
    await parrentSData(selectedOption.value);
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
          {routeId ? "Update Route" : "Create Route"}
        </DialogTitle>
        <DialogContent className="bg-secLightBg" sx={{ overflowY: "scroll" }}>
          <div className="my-4">
            <p className="mb-2">Parrent Route</p>
            <Select
              value={selectedParrent}
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

          {modalOpen && (
            <ImageModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              imgSrc={selectedImage}
            />
          )}



          <div className="my-4">
            <TextField
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              value={selectedRoute.title || ""}
              onChange={(e) =>
                setSelectedRoute({ ...selectedRoute, title: e.target.value })
              }
              className="bg-secLightBg"
              inputlabelprops={{ style: { color: "inherit" } }}
              inputprops={{ style: { color: "inherit" } }}
            />
          </div>

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
              value={selectedRoute.details || ""}
              onChange={(e) =>
                setSelectedRoute({ ...selectedRoute, details: e.target.value })
              }
              className="bg-secLightBg"
              inputlabelprops={{ style: { color: "inherit" } }}
              inputprops={{ style: { color: "inherit" } }}
            />
          </div>

          {parrentData.view == "TableView" && 
          <div className="my-4">
              <h3 className="text-textLightColor">Table Rows</h3>
            {parrentData.data.tableCol && Object.keys(parrentData.data.tableCol).map((key) => (
              <>
              <TextField
                margin="dense"
                label={`${key}`}
                type="text"
                fullWidth
                // value={field.tableCol}
                // onChange={(event) => handleFieldChange(index, event, "tableCol")}
                className="bg-secLightBg"
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{ style: { color: "inherit" } }}
              />                 
              </>
            ))}
            </div>
          }

          {selectedRoute.view == "TableView" && 
  <div className="my-4">
    <h3 className="text-textLightColor"> Table Colums</h3>
    {dataFields.map((field, index) => (
      <div key={index} className="flex items-center space-x-4">
        <TextField
          margin="dense"
          label={`Column ${index + 1}`}
          type="text"
          fullWidth
          value={field.tableCol}
          onChange={(event) => handleFieldChange(index, event, "tableCol")}
          className="bg-secLightBg"
          InputLabelProps={{ style: { color: "inherit" } }}
          InputProps={{ style: { color: "inherit" } }}
        />
        <Button
          onClick={() => handleRemoveField(index)}
          color="secondary"
          className="bg-[#0056b3] hover:bg-[#004494] text-white rounded"
        >
          Remove
        </Button>
      </div>
    ))}
    <Button
      onClick={handleAddField}
      className="mt-4 bg-primary hover:bg-darkPrimary text-white rounded"
    >
      Add Field
    </Button>
  </div>
}

          
        </DialogContent>
        <DialogActions className="bg-secLightBg">
          <Button
            onClick={closeDialog}
            className="bg-[#ff5c5c] hover:bg-[#e0471b] text-white rounded"
          >
            Cancel
          </Button>
          <Button
            onClick={routeId ? handleUpdateRoute : handleCreateRoute}
            className="bg-primary hover:bg-darkPrimary text-white rounded"
          >
            {routeId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateRoute;



// import { useEffect, useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
//  import Button from "@mui/material/Button";
//  import axios from "axios";
//  import Slider from "react-slick";
//  import { error_toast, sucess_toast } from "@/utils/toastNotification";
//  import ImageModal from "@/components/ImageModal";
//  import { useStateContext } from "@/contexts/ContextProvider";
//  import LoadingScreen from "@/utils/loadingScreen";
//  import Select from "react-select";

//  const CreateRoute = (routeId) => {

//    const { isLoading, setIsLoading, showNew, setShowNew, setReloadfetch } = useStateContext();
//    const [routes, setRoutes] = useState([]);
//    const [modalOpen, setModalOpen] = useState(false);
//    const [selectedImage, setSelectedImage] = useState("");
   
//    const [dataFields, setDataFields] = useState([
//     {tableCol : { value: ""  }}
//   ]);
  

//    const [selectedRoute, setSelectedRoute] = useState({
//      parrentPath: "",
//      title: "",
//      path: "",
//      view: "",
//      image: "",
//      details: "",
//      data: {},
//    });

//    const [selectedParrent, setSelectedParrent] = useState(
//    );


//    const optionsRoutes = routes.map((route) => ({
//      value: route._id,
//      label: route.path,
//    }));

//    const fetchRoutes = async () => {
//      try {

//        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);

//        setRoutes(data);

//        if (routeId.routeId) {
//          const dataWithId = await axios.get(`${import.meta.env.VITE_API_URL}/route/${routeId.routeId}`);

//          setSelectedRoute(dataWithId?.data);

//          const dataWithParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${dataWithId.data.parrentPath}`);



//          setSelectedParrent({
//            value: dataWithParrent?.data?._id,
//            label: dataWithParrent?.data?.path,
//          })
        
         
//          const dataFields = Object.entries(dataWithId?.data?.data.tableCol || {}).map(([key, value]) => ({ column: key, value }));



//          setDataFields(dataFields);
       
//        }




//      } catch (error) {
//        // error_toast(
//        //   `Failed to fetch routes: ${error.response ? error.response.data.message : error.message
//        //   }`
//        // );
//        console.error(`Failed to fetch routes: ${error.response ? error.response.data.message : error.message
//          }`);

//      } finally {
//        setIsLoading(false);
//      }
//    };

//    useEffect(() => {
//      fetchRoutes();
//       // filterdataFields();
//    }, []);



// //    useEffect(() => {
// //      filterdataFields();

// //    }, [selectedRoute.view])

// //  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!?
// //    const filterdataFields = () => {

   
// //      if(selectedRoute.view === "TableView"){
// //        console.log("table view")
// //      }
// //      // setDataFields([{ key: "", value: "" }])
    
    
    
// //     if(selectedRoute.view === "PdfReader"){
      
// //       console.log("PdfReader view")
// //     }


// //   }

//   const viewOptions = [
//     { name: "View1", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View1.png` },
//     { name: "View2", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View2.png` },
//     { name: "View3", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View3.png` },
//     { name: "View4", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View4.png` },
//     { name: "View5", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View5.png` },
//     { name: "TableView", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/tableView.png` },
//     { name: "PdfReader", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/pfdReader.png` },
//   ];

//   const handleViewSelection = (viewName) => {
//     setSelectedRoute({ ...selectedRoute, view: viewName });
//   };

//   const handleImageClick = (imgSrc) => {
//     setSelectedImage(imgSrc);
//     setModalOpen(true);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const fileName = file.name;
//       setSelectedRoute({ ...selectedRoute, image: fileName });
//     }
//   };

//   const getImageSrc = (src) => {
//     if (src.startsWith('http')) {
//       return src;
//     }
//     return `${import.meta.env.VITE_PUBLIC_URL1}/${src}`;
//   };

//   // ! .................................................................
//    // Handle changes to the dynamic fields
//  const handleFieldChange = (index, event) => {
//    const { value } = event.target;

//    setDataFields((prevFields) => {
//      const updatedFields = [...prevFields];
//      updatedFields[index] = { value };

//      // Rebuild data object from updated fields
//      const dataObject = updatedFields.reduce((obj, item, idx) => {
//        if (item.value) {
//          obj[`field_${idx + 1}`] = item.value; // Adjusting key based on index
//        }
//        return obj;
//      }, {});
   
     
//      setSelectedRoute((prev) => ({ ...prev, data: {tableCol : dataObject} }));
    
//      return updatedFields;
//    });
//  };

//  const handleRemoveField = (index) => {
//    setDataFields((prevFields) => {
//      const updatedFields = prevFields.filter((_, i) => i !== index);

//      const dataObject = updatedFields.reduce((obj, item, idx) => {
//        if (item.value) {
//          obj[`field_${idx + 1}`] = item.value; // Adjust key accordingly
//        }
//        return obj;
//      }, {});

//      setSelectedRoute((prev) => ({ ...prev, data: {tableCol : dataObject} }));
//      return updatedFields;
//    });
//  };





//  const handleAddField = () => {
//    setDataFields([...dataFields, { value: "" }]);
//  };




//  const handleCreateRoute = async () => {
//    try {

//      const dataParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${selectedRoute.parrentPath}`);

//      const dataRoute = { ...selectedRoute, path: `${dataParrent.data.path}${selectedRoute.path}` }

//      await axios.post(`${import.meta.env.VITE_API_URL}/route`, dataRoute);

//      sucess_toast("Route created successfully");

//      setSelectedRoute({});
//      setShowNew(false);
//      setReloadfetch(true);
//    } catch (error) {
//      error_toast(
//        `Failed to create route: ${error.response ? error.response.data.message : error.message
//        }`
//      );
//      console.error(error);
//    }
//  };

//  const handleUpdateRoute = async () => {
//    try {
//      await axios.patch(
//        `${import.meta.env.VITE_API_URL}/route/${selectedRoute._id}`,
//        selectedRoute // This includes the `data` object with your fields
//      );

//      sucess_toast("Route updated successfully");

//      setSelectedRoute({}); // Reset the state after successful update
//      setShowNew(false);
//      setReloadfetch(true);
//    } catch (error) {
//      error_toast(
//        `Failed to update route: ${error.response ? error.response.data.message : error.message
//        }`
//      );
//      console.error(error);
//    }
//  };


//    const resetForm = () => {
//      setSelectedRoute({
//        parrentPath: "",
//        title: "",
//        path: "",
//        view: "",
//        image: "",
//        details: "",
//        data: {},
//      });
//      setDataFields([]);
//      setShowNew(false);
//    };

//    const closeDialog = () => {
//      resetForm();
//    };

//    const settings = {
//      dots: true,
//      infinite: true,
//      speed: 500,
//      slidesToShow: 3,
//      slidesToScroll: 1,
//    };


//    const customStyles = {
//      control: (provided, state) => ({
//        ...provided,
//        backgroundColor: '#d0d0d0', // Change the background color
//        borderColor: !state.isFocused ? '#1c1c1c' : '#0056b3', // Change the border color based on focus state
//        '&:hover': {
//          borderColor: '#0056b3', // Change the border color on hover
//        },
//      }),
//      placeholder: (provided) => ({
//        ...provided,
//        color: '#1c1c1c', // Change the placeholder color
//      }),
//      singleValue: (provided) => ({
//        ...provided,
//        color: '#1c1c1c', // Change the selected value color
//      }),
//      menu: (provided) => ({
//        ...provided,
//        backgroundColor: '#d0d0d0',
//        zIndex: '99',
//        // Change the dropdown menu background color
//      }),
//      option: (provided, state) => ({
//        ...provided,
//        backgroundColor: state.isSelected ? '#0056b3' : '#d0d0d0', // Change the option background color
//       color: !state.isSelected ? '#1c1c1c' : 'white', // Change the option text color
//        margin: '5px 0',
//        '&:hover': {
//          backgroundColor: '#0056b3',
//          color: "white",
//          transition: '0.5s',
//        },
//      }),
//    };

//    const onChangeParrentPath = (selectedOption) => {
//      console.log("Selected option:", selectedOption);
//      setSelectedRoute({
//        ...selectedRoute,
//        parrentPath: selectedOption.value,
//      });
//      setSelectedParrent({
//        value: selectedOption.value,
//        label: selectedOption.label,
//      });
//    };



//    return (
//      <>
//        {isLoading && <LoadingScreen />}
//        <Dialog
//          open={showNew}
//          onClose={closeDialog}
//          maxWidth="md"
//          sx={{ "& .MuiDialog-paper": { width: "80%", overflowX: "hidden" } }}
//        >
//          <DialogTitle className="bg-secLightBg text-textLightColor">

//            {routeId.routeId ? "Update Route" : "Create Route"}

//          </DialogTitle>
//          <DialogContent className="bg-secLightBg" sx={{ overflowY: "scroll" }}>
//            <div className="my-4">
//              <p className="mb-2">Parrent Route</p>
//              <Select
//                value={selectedParrent} // Ensure this is correct
//                onChange={onChangeParrentPath}
//                options={optionsRoutes}
//                isSearchable
//                placeholder="Rechercher un parent Route"
//                styles={customStyles}
//                className="w-full rounded-md focus:outline-none focus:border-[#54ad34]"
//              />


//            </div>

//            <div className="my-4">

//              <TextField
//                margin="dense"
//                label="Path"
//                type="text"
//                fullWidth
//                value={selectedRoute.path || "/"}
//                onChange={(e) =>
//                  setSelectedRoute({ ...selectedRoute, path: e.target.value })
//                }
//                className="bg-secLightBg"
//                inputlabelprops={{ style: { color: "inherit" } }}
//                inputprops={{ style: { color: "inherit" } }}
//              />
            
//            </div>
//            <div className="m-4">
//              <Slider {...settings}>
//                {viewOptions.map((option) => (
//                  <div
//                    key={option.name}
//                    onClick={() =>
//                      handleViewSelection(option.name)
//                    }
//                    className={`cursor-pointer p-2 rounded-lg border-2 ${selectedRoute.view === option.name
//                      ? "border-primary shadow-xl"
//                      : "border-transparent"
//                      }`}
//                  >
//                    <img
//                      src={option.imgSrc}
//                      alt={option.name}
//                      className="w-full h-32 object-cover rounded-lg"
//                      onClick={() => handleImageClick(option.imgSrc)}
//                    />
//                    <p className="text-center mt-2">{option.name}</p>
//                  </div>
//                ))}
//              </Slider>
//            </div>

//            <TextField
//              autoFocus
//              margin="dense"
//              label="Title"
//              type="text"
//              fullWidth
//              value={selectedRoute.title}
//              onChange={(e) =>
//                setSelectedRoute({ ...selectedRoute, title: e.target.value })
//              }
//              inputlabelprops={{ style: { color: "inherit" } }}
//              inputprops={{ style: { color: "inherit" } }}
//            />
//            <div className="my-4">
//              <Button variant="contained" component="label" color="primary" className=" bg-secLightBg text-textLightColor w-1/4  " >
//                Upload Image

//                <input accept="image/*"
//                  id="contained-button-file"
//                  type="file"
//                  onChange={handleImageUpload}
//                  className="my-4 bg-secLightBg text-textLightColor" hidden
//                />

//              </Button>

//            </div>
//            <div className="my-4">

//              {/* Display the image preview */}
//              {selectedRoute.image && (
//                <div className="mb-4">
//                  <p className="text-textLightColor">Selected Image Preview:</p>
//                  <img
//                    src={getImageSrc(selectedRoute.image)}
//                    alt="Image Preview"
//                    className="h-32 object-cover rounded-lg mt-2"
//                  />
//                </div>
//              )}
//            </div>
//            <div className="my-4">

//              <TextField
//                margin="dense"
//                label="Details"
//                type="text"
//                fullWidth
//                value={selectedRoute.details}
//                onChange={(e) =>
//                  setSelectedRoute({ ...selectedRoute, details: e.target.value })
//                }
//                className="bg-secLightBg"
//                inputlabelprops={{ style: { color: "inherit" } }}
//                inputprops={{ style: { color: "inherit" } }}
//              />

//            </div>

//            {/* 
//             // ? data fields ********************************************************************************* 
//            */}
//            {selectedRoute.view == "PdfReader" && 
//              <div className="my-4">
//              <Button variant="contained" component="label" color="primary" className=" bg-secLightBg text-textLightColor w-1/4  " >
//                Upload File

//                <input accept="file/*"
//                  id="contained-button-file"
//                  type="file"
//                  // onChange={handleImageUpload}
//                  className="my-4 bg-secLightBg text-textLightColor" hidden
//                />

//              </Button>

//            </div>
//            }

//         {selectedRoute.view =="TableView"  &&  
// <div className="my-4">
// <h4 className="text-textLightColor mb-2">Data Fields</h4>
// {dataFields.map((field, index) => (
//   <div key={index} className="flex items-center gap-2 my-6">
//     <TextField
//       label="Field Value"
//       value={field.value}
//       onChange={(e) => handleFieldChange(index, e)}
//       className="bg-secLightBg"
//       InputLabelProps={{ style: { color: "inherit" } }}
//       InputProps={{ style: { color: "inherit" } }}
//       fullWidth
//     />
//     <Button
//       onClick={() => handleRemoveField(index)}
//       className="text-primary hover:text-darkPrimary"
//     >
//       Remove
//     </Button>
//   </div>
// ))}

// <Button onClick={handleAddField} className="text-primary hover:text-darkPrimary">
//   Add Field
// </Button>
// </div> 
//  }  
//          </DialogContent>
//          <DialogActions className="bg-secLightBg">
//            <Button onClick={() => closeDialog()} color="primary">
//              Cancel
//            </Button>
//            {routeId.routeId ? (
//              <Button onClick={handleUpdateRoute} color="primary">
//                Update
//              </Button>

//            ) : (<Button onClick={handleCreateRoute} color="primary">
//              Create
//            </Button>)}
//          </DialogActions>
//        </Dialog>

//        {/* Image Modal */}
//        {modalOpen && (
//          <ImageModal
//            open={modalOpen}
//            onClose={() => setModalOpen(false)}
//            imgSrc={selectedImage}
//          />
//        )}
//      </>
//    );
//  };

//  export default CreateRoute;
