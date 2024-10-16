import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@/components/button";
import axios from "axios";
import Slider from "react-slick";
import { error_toast, sucess_toast ,info_toast } from "@/utils/toastNotification";
import ImageModal from "@/components/ImageModal";
import { useStateContext } from "@/contexts/ContextProvider";
import LoadingScreen from "@/utils/loadingScreen";
import Select from "react-select";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fr } from "date-fns/locale";
import { CiImageOn } from "react-icons/ci";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegFileExcel } from "react-icons/fa";
import { viewOptions } from "@/data/DataForm";
import { FaRegFileWord } from "react-icons/fa";

const CreateRoute = ({ routeId ,parrentId}) => {
  const { isLoading, setIsLoading, showNew, setShowNew, setReloadfetch ,reloadfetch } = useStateContext();
  const [routes, setRoutes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [dataFields, setDataFields] = useState([{ tableCol: "", value: "" }]);
  const [dataRowFields, setDataRowFields] = useState([{}]);
  const [selectedRoute, setSelectedRoute] = useState({
    parrentPath: parrentId.value ||"",
    title: "",
    path: "",
    view: "",
    image: "",
    file: "",
    expiredate: "",
    details: "",
    data: { tableCol: {} , tableRow: {}},
  });
  const [selectedParrent, setSelectedParrent] = useState(parrentId || "");

  const [parrentData, setParrentData] = useState({});

  const optionsRoutes = routes.filter((route) => route.view !== "PdfReader").map((route) => ({
    value: route._id,
    label: route.path,
  }));

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
       info_toast("Le chemin de la route doit contenir un '/'.");
       return;
      }


      if(selectedRoute.view == "ExcelReader" || selectedRoute.view == "PdfReader"){
        if(selectedRoute.file === ""){
          info_toast("Veuiller selectionner un fichier.");
          return;
        }
      }


      
      // const dataParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${selectedRoute.parrentPath}`);

      const dataRoute = { ...selectedRoute, path: `${selectedRoute.path}` };

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
 

  

  const parrentSData = async (id) =>{
    // console.log("id",id)
    const dataWithId = await axios.get(`${import.meta.env.VITE_API_URL}/route/${id}`);


    setParrentData(dataWithId.data)

 
  }

  const onChangeParrentPath = async (selectedOption) => {

    // const pathArray =  selectedRoute.path.split("/"); 
    
    // const path = pathArray[pathArray.length - 1]
     console.log("selectedOption" ,selectedOption.value)
 
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
    PaperProps={{
      sx: {
        height: "100%",
        overflowX: "hidden",
        borderRadius: "15px",
        padding: "10px",
      },
    }}
    sx={{ "& .MuiDialog-paper": { height: "100%", overflowX: "hidden" } }}
  >
    <h3 className="text-xl font-semibold dark:text-white p-4">
      {routeId ? "Mettre à jour Route" : "Créer un Route"}
    </h3>
    <div className="bg-white dark:bg-gray-800 mx-3">
      <div className="my-4">
        <label className="py-3 block text-md font-medium text-gray-700 dark:text-gray-300">Parent Route :</label>
        <Select
          value={selectedParrent}
          onChange={onChangeParrentPath}
          options={optionsRoutes}
          isSearchable
          placeholder="Rechercher un parent Route"
          className="px-3 z-30 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="my-4">
        <label className="py-3 block text-md font-medium text-gray-700 dark:text-gray-300">Chemin :</label>
        <input
          label="/Chemin"
          type="text"
          value={selectedRoute.path || ""}
          onChange={(e) =>
            setSelectedRoute({ ...selectedRoute, path: e.target.value })
          }
          className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="m-4">
  <Slider {...settings}>
    {viewOptions.map((option) => (
      <div
        key={option.name}
        onClick={() => handleViewSelection(option.name)}
        className={`cursor-pointer p-4 rounded-lg border-2 mx-3 transition-all duration-300 hover:border-textDarkColor
          ${selectedRoute.view === option.name ? "border-textSecLightColor shadow-xl" : "border-transparent"}`}
      >
        <img
          src={option.imgSrc}
          alt={option.name}
          className="w-full h-32 object-contain rounded-md"
          onClick={() => handleImageClick(option.imgSrc)}
        />
        <p className="text-center mt-2 text-md font-medium text-gray-700 dark:text-gray-300">
          {option.titre}
        </p>
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
        <label className="py-3 block text-md font-medium text-gray-700 dark:text-gray-300">Titre :</label>
        <input
          label="Titre"
          type="text"
          value={selectedRoute.title || ""}
          onChange={(e) =>
            setSelectedRoute({ ...selectedRoute, title: e.target.value })
          }
          className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="my-4">
  <label
    htmlFor="contained-button-file"
    className="cursor-pointer flex w-fit justify-center gap-2 items-center px-4 py-2 bg-white text-black border-black border font-medium text-md rounded-md shadow-md hover:bg-black hover:text-white duration-300"
  >
    <CiImageOn className="text-xl mr-2" />
    Télécharger l'image
  </label>

  <input
    accept="image/*"
    id="contained-button-file"
    type="file"
    onChange={handleImageUpload}
    className="hidden"
  />
</div>




{selectedRoute.view === "PdfReader" && (
  <div className="my-4">
    <label
      htmlFor="pdf-upload"
      className="cursor-pointer flex w-fit justify-center gap-2 items-center px-4 py-2 bg-white text-black border-black border font-medium text-md rounded-md shadow-md hover:bg-black hover:text-white duration-300"
    >
      <FaRegFilePdf   className="text-xl  text-[#df3232] mr-2" />
      Télécharger le fichier Pdf
    </label>
    
    <input
      type="file"
      accept="application/pdf"
      id="pdf-upload"
      onChange={handleFileUpload}
      className="hidden"
    />
    <p className="my-4 text-textSecLightColor font-semibold text-xl">{selectedRoute?.file}</p>
  </div>
)}

{selectedRoute.view === "ExcelReader" && (
  <div className="my-4">
    <label
      htmlFor="excel-upload"
      className="cursor-pointer flex w-fit justify-center gap-2 items-center px-4 py-2 bg-white text-black border-black border font-medium text-md rounded-md shadow-md hover:bg-black hover:text-white duration-300"
    >
      <FaRegFileExcel  className="text-xl text-[#217346] mr-2" />
      Télécharger le fichier Excel
    </label>
    
    <input
      type="file"
      accept="application/vnd.ms-excel"
      id="excel-upload"
      onChange={handleFileUpload}
      className="hidden"
    />
    <p className="my-4 text-textSecLightColor font-semibold text-xl">{selectedRoute?.file}</p>
  </div>
)}
{selectedRoute.view === "WordReader" && (
  <div className="my-4">
    <label
      htmlFor="word-upload"
      className="cursor-pointer flex w-fit justify-center gap-2 items-center px-4 py-2 bg-white text-black border-black border font-medium text-md rounded-md shadow-md hover:bg-black hover:text-white duration-300"
    >
      <FaRegFileWord   className="text-lg text-[#2B579A] font-normal mr-2" />
      Télécharger le fichier Word
    </label>
    
    <input
      type="file"
      accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      id="word-upload"
      onChange={handleFileUpload}
      className="hidden"
    />
    <p className="my-4 text-textSecLightColor font-semibold text-xl">{selectedRoute?.file}</p>
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
      <label className="py-3 block text-md font-medium text-gray-700 dark:text-gray-300">Détails :</label>

        <input
          label="Détails"
          type="text"
          value={selectedRoute.details || ""}
          onChange={(e) =>
            setSelectedRoute({ ...selectedRoute, details: e.target.value })
          }
          className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
        />
      </div>
      
      <div className="my-4">
  {selectedRoute.createdAt && (
    <p className="py-3  text-md font-medium text-gray-700 dark:text-gray-300 ">
      Date de création: {new Date(selectedRoute.createdAt).toLocaleDateString("fr-FR")}
    </p>
  )}
</div>



{selectedRoute.view === "PdfReader" && (
  <div className="my-4 flex items-center gap-4">
    <label className="font-medium text-md text-gray-700 dark:text-gray-300">
      Expire date du fichier:
    </label>
    <DatePicker
      selected={selectedRoute?.expiredate || null}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy" 
      placeholderText="Sélectionner une date"
      className="p-2 border border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
      locale={fr} 
    />
  </div>
)}


      <div className="my-4">
        {parrentData?.data && (
          <>
            <label className="py-3 block text-md font-medium text-gray-700 dark:text-gray-300">Lignes du tableau :</label>

            {parrentData?.data && Object.keys(parrentData?.data.tableCol).map((key, index) => (
              <input
              key={index}
                label={`${key}`}
                placeholder={key}
                type="text"
                value={selectedRoute?.data?.tableRow[index]?.[key] || ""}
                onChange={(event) => handleFieldRowChange(index, event, key)}
                className="px-3 py-3 my-4 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
              />
            ))}
          </>
        )}
      </div>

      {selectedRoute.view === "TableView" && (
        <div className="my-4">
          <label className="py-3 block text-md font-medium text-gray-700 dark:text-gray-300">Colonnes du tableau :</label>
          {dataFields.map((field, index) => (
            <div key={index} className="flex items-center space-x-4">
              <input
                label={`Colonne ${index + 1}`}
                type="text"
                value={field.tableCol}
                onChange={(event) => handleFieldTableChange(index, event, "tableCol")}
                className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
              />
              <div className="flex items-center space-x-4" onClick={() => handleRemoveField(index)}>
                <Button Text="Retirer"  />
              </div>
              
            </div>
          ))}
          <div  onClick={handleAddField} className="mt-4 w-fit text-white rounded">
            <Button Text="Ajouter une colonne"/>
          </div>
          
        </div>
      )}
    </div>
    <div className="mt-6 mx-5 flex justify-end space-x-4">
          <div onClick={closeDialog}>

          <Button  Text="Annuler"/>
          </div>
          <div onClick={routeId ? handleUpdateRoute : handleCreateRoute}>

            <Button
              Text={routeId ? "Mise à jour" : "Créer"}
            />
          </div>
            
        </div>
  </Dialog>
</>

  );
};

export default CreateRoute;


