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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale";


const CreateRoute = ({ routeId }) => {
  const { isLoading, setIsLoading, showNew, setShowNew, setReloadfetch ,reloadfetch } = useStateContext();
  const [routes, setRoutes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [dataFields, setDataFields] = useState([{ tableCol: "", value: "" }]);
  const [dataRowFields, setDataRowFields] = useState([{}]);
  const [selectedRoute, setSelectedRoute] = useState({
    parrentPath: "",
    title: "",
    path: "",
    view: "",
    image: "",
    file: "",
    expiredate: "",
    details: "",
    data: { tableCol: {} , tableRow: {}},
  });
  const [selectedParrent, setSelectedParrent] = useState();

  const [parrentData, setParrentData] = useState({});

  const optionsRoutes = routes.filter((route) => route.view !== "PdfReader").map((route) => ({
    value: route._id,
    label: route.path,
  }));

  

    const viewOptions = [
    { name: "View1", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View1.png` , titre:"Voir 1" },
    { name: "View2", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View2.png` , titre:"Voir 2"}, 
    { name: "View3", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View3.png` , titre:"Voir 3"}, 
    { name: "View4", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View4.png` , titre:"Voir 4" },
    { name: "View5", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View5.png` , titre:"Voir 5" },
    { name: "TableView", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/tableView.png` , titre:"Vue de table" },
    { name: "PdfReader", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/pfdReader.png` ,titre:"Lecteur PDF"},
    { name: "ExcelReader", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/excelReader.png` , titre:"Excel Reader"},
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
  const handleFileUpload = (e) => {
    const file = e.target.files[0];


    if (file) {
      const fileName = file.name;
      setSelectedRoute({ ...selectedRoute, file: fileName });
    }

  }

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

        // !!!!!!!!!!!!!!!!!!!!
        setSelectedParrent({
          value: dataWithParrent?.data?._id,
          label: dataWithParrent?.data?.path,
        });
      

        setParrentData(dataWithParrent.data)

        const dataFields = Object.entries(dataWithId?.data?.data.tableCol || {}).map(([tableCol, value]) => ({ tableCol, value }));
        setDataFields(dataFields);


        setDataRowFields(dataWithId?.data?.data.tableRow || []);
      }


    } catch (error) {
      console.error(`Impossible de récupérer les routes: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);
  


  const handleFieldTableChange = (index, event, field) => {
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

        setSelectedRoute((prev) => ({
            ...prev,
            data: { ...prev.data, tableCol: dataObject },
        }));
        return updatedFields;
    });
};


const handleFieldRowChange = (index, event, key) => {
    const { value } = event.target;

    setDataRowFields((prevFields) => {
        const updatedFields = [...prevFields];
        updatedFields[index] = { ...updatedFields[index], [key]: value };

        setSelectedRoute((prev) => ({
            ...prev,
            data: { ...prev.data, tableRow: updatedFields },
        }));


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

      if(!selectedRoute.path.includes("/")){
        error_toast("Le chemin de la route doit contenir un '/'.");
        return;
      }

      
      // const dataParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${selectedRoute.parrentPath}`);
      const dataRoute = { ...selectedRoute, path: `${selectedRoute.path}` };

      
      console.log("dataRoute",dataRoute);

      await axios.post(`${import.meta.env.VITE_API_URL}/route`, dataRoute);
 


      sucess_toast("Route créé avec succès");
      
      setSelectedRoute({});
      setShowNew(false);
      setReloadfetch(!reloadfetch);
    } catch (error) {
      error_toast(`Échec de la création de route: ${error.response ? error.response.data.message : error.message}`);
      console.error(error);
    }
  };

  const handleUpdateRoute = async () => {
    try {

      if(!selectedRoute.path.includes("/")){
        error_toast("Le chemin de la route doit contenir un '/'.");
        return;
      }
      
      await axios.patch(`${import.meta.env.VITE_API_URL}/route/${selectedRoute._id}`, selectedRoute);
      sucess_toast("Route mis à jour avec succès");

      setSelectedRoute({});
      setShowNew(false);
      setReloadfetch(!reloadfetch);

    } catch (error) {
      error_toast(`Échec de la mise à jour de route: ${error.response ? error.response.data.message : error.message}`);
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
    // console.log("id",id)
    const dataWithId = await axios.get(`${import.meta.env.VITE_API_URL}/route/${id}`);
    setParrentData(dataWithId.data)
  }

  const onChangeParrentPath = async (selectedOption) => {

    // const pathArray =  selectedRoute.path.split("/"); 
    
    // const path = pathArray[pathArray.length - 1]

 
    setSelectedRoute({
      ...selectedRoute,
      parrentPath: selectedOption.value,
      // path: `${selectedOption.label}/${path}`,
    });
    
    
    await parrentSData(selectedOption.value);
    
    setSelectedParrent({
        value: selectedOption.value,
        label: selectedOption.label,
    });
    
  };


  
  const handleDateChange = (date) => {
    setSelectedRoute({ ...selectedRoute, expiredate : date });
  };
  
  

  return (
    <>
  {isLoading && <LoadingScreen />}
  <Dialog
    open={showNew}
    onClose={closeDialog}
    maxWidth="lg"
    sx={{ "& .MuiDialog-paper": { height: "100%", overflowX: "hidden" } }}
  >
    <DialogTitle className="bg-secLightBg text-textLightColor font-bold text-xl">
      {routeId ? "Mettre à jour Route" : "Créer un Route"}
    </DialogTitle>
    <DialogContent className="bg-secLightBg overflow-y-auto">
      <div className="my-4">
        <p className="mb-2 text-lg">Parent Route</p>
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
          label="/Chemin"
          type="text"
          fullWidth
          value={selectedRoute.path || ""}
          onChange={(e) =>
            setSelectedRoute({ ...selectedRoute, path: e.target.value })
          }
          className="bg-secLightBg text-textLightColor"
          InputLabelProps={{ style: { color: "inherit" } }}
          InputProps={{ style: { color: "inherit" } }}
        />
      </div>

      <div className="m-4">
        <Slider {...settings}>
          {viewOptions.map((option) => (
            <div
              key={option.name}
              onClick={() => handleViewSelection(option.name)}
              className={`cursor-pointer p-2 rounded-lg border-2 ${selectedRoute.view === option.name
                ? "border-primary shadow-xl"
                : "border-transparent"
                }`}
            >
              <img
                src={option.imgSrc}
                alt={option.name}
                className="w-full h-32 object-contain rounded-lg"
                onClick={() => handleImageClick(option.imgSrc)}
              />
              <p className="text-center mt-2 font-medium">{option.titre}</p>
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
          label="Titre"
          type="text"
          fullWidth
          value={selectedRoute.title || ""}
          onChange={(e) =>
            setSelectedRoute({ ...selectedRoute, title: e.target.value })
          }
          className="bg-secLightBg text-textLightColor"
          InputLabelProps={{ style: { color: "inherit" } }}
          InputProps={{ style: { color: "inherit" } }}
        />
      </div>

      <div className="my-4">
        <Button variant="contained" component="label" color="primary" className="bg-secLightBg text-textLightColor w-1/4">
          Image
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleImageUpload}
            className="hidden"
          />
        </Button>
      </div>

      {selectedRoute.view === "PdfReader" && (
        <div className="my-4">
          <Button variant="contained" component="label" color="primary" className="bg-secLightBg text-textLightColor w-1/4">
            Télécharger le fichier Pdf
            <input
              type="file" accept="application/pdf"
              id="contained-button-file"
              onChange={handleFileUpload}
              className="hidden"
            />
          </Button>
          <p className="my-4 text-primary font-semibold text-xl">{selectedRoute?.file}</p>
        </div>
      )}
      {selectedRoute.view === "ExcelReader" && (
        <div className="my-4">
          <Button variant="contained" component="label" color="primary" className="bg-secLightBg text-textLightColor w-1/4">
            Télécharger le fichier Excel
            <input
              type="file" accept="application/vnd.ms-excel"
              id="contained-button-file"
              onChange={handleFileUpload}
              className="hidden"
            />
          </Button>
          <p className="my-4 text-primary font-semibold text-xl">{selectedRoute?.file}</p>
        </div>
      )}
      <div className="my-4">
        {/* Display the image preview */}
        {selectedRoute.image && (
          <div className="mb-4">
            <p className="text-textLightColor">Aperçu de L&apos;image sélectionnée:</p>
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
          label="Détails"
          type="text"
          fullWidth
          value={selectedRoute.details || ""}
          onChange={(e) =>
            setSelectedRoute({ ...selectedRoute, details: e.target.value })
          }
          className="bg-secLightBg text-textLightColor"
          InputLabelProps={{ style: { color: "inherit" } }}
          InputProps={{ style: { color: "inherit" } }}
        />
      </div>
      
      <div className="my-4">
        {selectedRoute.createdAt && (
          <p className="text-textLightColor">Date de création: <br />{selectedRoute.createdAt}</p>
        )}
      </div>

      {selectedRoute.view === "PdfReader" && (
        <div className="my-4 flex items-center gap-4 ">
          <label>Expire date du fichier : </label>
          <DatePicker
            selected={selectedRoute?.expiredate || ""}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy" // Set the date format
            placeholderText="Sélectionner une date"
            className="p-2 border border-primary rounded-lg"
            locale={fr} // Set locale to French
            isClearable
          />
        </div>
      )}

      <div className="my-4">
        {parrentData?.data && (
          <>
            <h3 className="text-textLightColor">Table Rows</h3>
            {parrentData?.data && Object.keys(parrentData?.data.tableCol).map((key, index) => (
              <TextField
                key={index}
                margin="dense"
                label={`${key}`}
                type="text"
                fullWidth
                value={selectedRoute?.data?.tableRow[index]?.[key] || ""}
                onChange={(event) => handleFieldRowChange(index, event, key)}
                className="bg-secLightBg text-textLightColor"
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{ style: { color: "inherit" } }}
              />
            ))}
          </>
        )}
      </div>

      {selectedRoute.view === "TableView" && (
        <div className="my-4">
          <h3 className="text-textLightColor">Table Columns</h3>
          {dataFields.map((field, index) => (
            <div key={index} className="flex items-center space-x-4">
              <TextField
                margin="dense"
                label={`Colonne ${index + 1}`}
                type="text"
                fullWidth
                value={field.tableCol}
                onChange={(event) => handleFieldTableChange(index, event, "tableCol")}
                className="bg-secLightBg text-textLightColor"
                InputLabelProps={{ style: { color: "inherit" } }}
                InputProps={{ style: { color: "inherit" } }}
              />
              <Button
                onClick={() => handleRemoveField(index)}
                color="secondary"
                className="bg-[#0056b3] hover:bg-[#004494] text-white rounded"
              >
                Retirer
              </Button>
            </div>
          ))}
          <Button
            onClick={handleAddField}
            className="mt-4 bg-primary hover:bg-darkPrimary text-white rounded"
          >
            Ajouter un champ
          </Button>
        </div>
      )}
    </DialogContent>
    
    <DialogActions className="bg-secLightBg">
      <Button
        onClick={closeDialog}
        className="bg-[#ff5c5c] hover:bg-[#e0471b] text-white rounded"
      >
        Annuler
      </Button>
      <Button
        onClick={routeId ? handleUpdateRoute : handleCreateRoute}
        className="bg-primary hover:bg-darkPrimary text-white rounded"
      >
        {routeId ? "Mise à jour" : "Créer"}
      </Button>
    </DialogActions>
  </Dialog>
</>

  );
};

export default CreateRoute;


