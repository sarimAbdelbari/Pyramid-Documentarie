import { useEffect, useState } from "react";
import axios from "axios";
import GroopCard from "@/components/GroopCard";
import { CiCirclePlus } from "react-icons/ci";
import { error_toast, sucess_toast } from "@/utils/toastNotification";
import CreateGroop from "@/pages/dashboard/Groop/CreateGroop";

const TableGroop = () => {
  const [groopData, setGroopData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [selectedGroop, setSelectedGroop] = useState(null); // Track the group to delete

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/groop`);
        setGroopData(response.data);
      } catch (error) {
        console.error('Error fetching groop data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/groop/${id}`);
      setGroopData(groopData.filter(groop => groop._id !== id));
      setIsModalOpen(false); // Close modal after deletion
      sucess_toast("Le groop a été supprimé avec succès");
    } catch (error) {
      console.error('Error deleting groop:', error);
      error_toast("Impossible de supprimer le groop");
    }
  };

  const openDeleteModal = (id) => {
    setSelectedGroop(id); // Set the group to delete
    setIsModalOpen(true);  // Open the modal
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedGroop(null); // Clear selection on close
  };

  const AreYouSure = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-96 transition-all transform">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Êtes-vous sûr ?
          </h2>
          <div className="flex justify-between gap-4">
            <button
              onClick={closeDeleteModal}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-all"
            >
              Annuler
            </button>
            <button
              onClick={() => handleDelete(selectedGroop)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const handleCloseCreateUserModal = () => {
    setIsModalCreateOpen(false);
  };
  const handleOpenCreateUserModal = () => {
    setIsModalCreateOpen(true);
  };
  
  return (
    <div className="py-10 px-4 lg:px-12  overflow-y-auto h-screen">
      <h3 className="text-center text-4xl font-medium text-black dark:text-textSecDarkColor mt-4 mb-6">
        Gestion des Groops
      </h3>
      <div className="flex flex-wrap gap-10 justify-center ">
        <div className="bg-white dark:bg-gray-800 min-h-96   shadow-lg rounded-3xl p-4 my-2 flex flex-col justify-center items-center min-w-[600px] w-full md:w-[540px] lg:w-[580px]  duration-300 hover:scale-105 hover:shadow-2xl">
          <div onClick={handleOpenCreateUserModal} className="flex flex-col items-center justify-center cursor-pointer">
            <CiCirclePlus className="text-6xl text-textSecLightColor hover:bg-textSecLightColor hover:text-white p-2 rounded-full duration-300 ease-in-out" />
          </div>
        </div>
        {groopData.map((groop) => (
          <GroopCard key={groop._id} groop={groop} onDelete={openDeleteModal} />
        ))}
      </div>

      {isModalOpen && <AreYouSure />}

      {isModalCreateOpen && <CreateGroop onClose={handleCloseCreateUserModal}  />}
    </div>
  );
};

export default TableGroop;