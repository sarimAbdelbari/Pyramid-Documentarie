import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useStateContext } from "@/contexts/ContextProvider";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDialog from "@/components/ConfirmDialog";
import { sucess_toast, error_toast } from "@/utils/toastNotification";
import CreateRoute from "@/pages/dashboard/route/CreateRoute";
import Button from "@/components/button";
import { FaUncharted } from "react-icons/fa6";
import { VscFilePdf } from "react-icons/vsc";
import { PiMicrosoftWordLogo } from "react-icons/pi";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { CiRoute } from "react-icons/ci";
import { SiReactrouter } from "react-icons/si";

const Routes = () => {
  const { isLoading, showNew, setShowNew, reloadfetch, setReloadfetch ,setIsLoading} = useStateContext();
  const [routesData, setRoutesData] = useState([]);
  const [routesStats, setRoutesStats] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState([]);

  useEffect(() => {
    fetchRoutes();
    setReloadfetch(false);

    const savedVisibilityModel = localStorage.getItem("columnVisibilityModelRoute");

    if (savedVisibilityModel) {
      setColumnVisibilityModel(JSON.parse(savedVisibilityModel));
    }

  }, [reloadfetch, setReloadfetch]);

  const fetchRoutes = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/stats/route`);

      setRoutesStats(response.data);

      const dataWithId = data.map((route, index) => ({
        ...route,
        id: index + 1,
      }));
      setRoutesData(dataWithId);
    } catch (error) {
      setIsLoading(false)
      error_toast(
        `Échec de la récupération des routes: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "path", headerName: "Chemin", flex: 2 },
    { field: "title", headerName: "Titre", flex: 2 },
    {
      field: "view",
      headerName: "Voir",
      flex: 2,
      renderCell: (params) =>
        params.row.view && (
          <div className="flex items-center">
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL1}/${params.row.view}.png`}
              alt="image"
              className="w-12 h-12 object-cover rounded-xl"
            />
          </div>
        ),
    },
    {
      field: "image",
      headerName: "Image",
      flex: 2,
      renderCell: (params) =>
        params.row.image && (
          <div className="flex items-center">
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL1}/${
                params?.row?.image || "imageHolder.jpg"
              }`}
              alt="image"
              className="w-12 h-12 object-cover rounded-full"
            />
          </div>
        ),
    },
    { field: "details", headerName: "Détails", flex: 2 },
    { field: "createdAt", headerName: "Créé à", flex: 2 },
    { field: "updatedAt", headerName: "Mis à jour à", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <div className="flex items-center gap-3 justify-center h-full">
          <CiEdit
            onClick={() => handleOpenDialog(params.row)}
            className="text-primary dark:text-textDarkColor hover:text-darkPrimary dark:hover:text-primary duration-300 text-2xl cursor-pointer hover:scale-125 ease-in-out"
          />
          <AiOutlineDelete
            onClick={() => handleOpenConfirmDialog(params.row._id)}
            className="text-accent dark:text-textDarkColor hover:text-darkAccent dark:hover:text-red-500 duration-300 text-2xl cursor-pointer hover:scale-125 ease-in-out"
          />
        </div>
      ),
    },
  ];

  const handleDeleteRoute = async () => {
    try {
      setIsLoading(true)
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/route/${routeToDelete}`
      );
      sucess_toast("Route supprimée avec succès");
      setRoutesData((prevState) =>
        prevState.filter((route) => route._id !== routeToDelete)
      );
      handleCloseConfirmDialog();
    } catch (error) {
      setIsLoading(false)
      error_toast(
        `Échec de la suppression de la route: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
    } finally {
      setIsLoading(false)
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

  const handleOpenDialog = (route) => {
    setSelectedRoute(route);

    setShowNew(true);
  };

  const openNewDialog = () => {
    setSelectedRoute("");
    setShowNew(true);
  };

  const handleColumnVisibilityChange = (newModel) => {
    setColumnVisibilityModel(newModel);
    localStorage.setItem(
      "columnVisibilityModelRoute",
      JSON.stringify(newModel)
    );
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-3xl font-semibold text-textLightColor dark:text-textDarkColor leading-relaxed">
        Gestion des Routes
      </h3>
      <div onClick={() => openNewDialog()}>
        <Button
          Text="Ajouter"
          Icon={<AddIcon />}
          className="bg-primary hover:bg-darkPrimary transition-colors duration-300"
        />
      </div>
      <div className="w-full">
        <div className="mx-5 shadow-2xl bg-lightCyen dark:shadow-white rounded-lg dark:bg-mainDarkBg flex justify-around items-center flex-wrap gap-4 py-5 px-4">
          {/* Nombre de Routes */}
          <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center text-textSecLightColor  text-lg font-semibold">
              <p>Nombre de Routes</p>
              <FaUncharted className="text-xl text-textLightColor" />
            </div>
            <div className="flex items-center gap-4 text-blue-600 dark:text-blue-400">
              <SiReactrouter className="text-2xl" />
              <p className="font-medium text-lg">{routesStats?.totalRoutes}</p>
            </div>
          </div>

          {/* Nombre de Pdf */}
          <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center text-textSecLightColor dark:text-red-300 text-lg font-semibold">
              <p>Nombre de Pdf</p>
              <FaUncharted className="text-xl text-textLightColor" />
            </div>
            <div className="flex items-center gap-4 text-[#980100]">
              <VscFilePdf className="text-2xl" />
              <p className="font-medium text-lg">{routesStats?.pdf}</p>
            </div>
          </div>

          {/* Nombre de Excel */}
          <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center text-textSecLightColor dark:text-green-300 text-lg font-semibold">
              <p>Nombre de Excel</p>
              <FaUncharted className="text-xl text-textLightColor" />
            </div>
            <div className="flex items-center gap-4 text-[#005217]">
              <PiMicrosoftExcelLogoFill className="text-2xl" />
              <p className="font-medium text-lg">{routesStats?.excel}</p>
            </div>
          </div>

          {/* Lecture Word */}
          <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center text-textSecLightColor dark:text-blue-300 text-lg font-semibold">
              <p>Lecture Word</p>
              <FaUncharted className="text-xl text-textLightColor" />
            </div>
            <div className="flex items-center gap-4 text-[#2B579A]">
              <PiMicrosoftWordLogo className="text-2xl" />
              <p className="font-medium text-lg">{routesStats?.word}</p>
            </div>
          </div>

          {/* Voir Commun */}
          <div className="min-w-64 bg-white dark:bg-secDarkBg rounded-lg p-4 flex flex-col gap-5 border-2 border-[#02020218] shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center text-purple-500 dark:text-purple-300 text-lg font-semibold">
              <p className="text-lg text-textLightColor">Route Commun</p>
              <FaUncharted className="text-xl text-textLightColor" />
            </div>
            <div className="flex items-center gap-4 text-purple-600 dark:text-purple-300">
              <CiRoute className="text-3xl" />
              <p className="font-medium text-lg">
                {routesStats?.most_distributed_route}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div
          className=" mx-5 shadow-2xl bg-lightCyen   dark:shadow-white rounded-lg  dark:bg-mainDarkBg py-2"
          style={{ height: "600px" }}
        >
          <DataGrid
            rows={routesData}
            columns={columns}
            pageSize={10}
            loading={isLoading}
            disableSelectionOnClick
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleColumnVisibilityChange}
            className="m-4 border-none text-textLightColor dark:text-gray-100"
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
      </div>

      {/* Create Route Dialog */}
      {showNew && <CreateRoute routeId={selectedRoute} />}

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
