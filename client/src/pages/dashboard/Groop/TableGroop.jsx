import { useEffect, useState } from "react";
import axios from "axios";
import GroopCard from "@/components/GroopCard";
import { CiCirclePlus } from "react-icons/ci";
import { error_toast, sucess_toast } from "@/utils/toastNotification";
import CreateGroop from "./CreateGroop";

const TableGroop = () => {
  const [groopData, setGroopData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [selectedGroop, setSelectedGroop] = useState(null); // Track the group to delete

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/groop');
        setGroopData(response.data);
      } catch (error) {
        console.error('Error fetching groop data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/groop/${id}`);
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



{/* <DataGrid
  rows={rows}
  columns={columns} 
  pageSize={10}
  rowsPerPageOptions={[10]}
  checkboxSelection
  disableSelectionOnClick
/> */}


 // const columns = [
  //   { field: 'id', headerName: 'ID', width: 150 },
  //   { field: 'groopName', headerName: 'Groop Name', width: 150 },
  //   {
  //     field: 'groopRoutes',
  //     headerName: 'Routes',
  //     width: 300,
  //     renderCell: (params) => (
  //       <ul>
  //         {params.value && params.value.map((route, index) => (
  //           <li key={index}>
  //             {route?.route?.title || 'No title'} - {route?.permission || 'No permission'}
  //           </li>
  //         ))}
  //       </ul>
  //     ),
  //   },
  //   {
  //     field: 'groopUsers',
  //     headerName: 'Users',
  //     width: 300,
  //     renderCell: (params) => (
  //       <ul>
  //         {params.value && params.value.map((user, index) => (
  //           <li key={index}>{user.userName}</li>
  //         ))}
  //       </ul>
  //     ),
  //   },
  // ];

  // Transform the groopData into rows for the DataGrid
  // const rows = groopData.map((groop) => ({
  //   id: groop._id,
  //   groopName: groop.groopName,
  //   groopRoutes: groop.groopRoutes || [],
  //   groopUsers: groop.groopUsers || [],
  // }));


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { DataGrid } from '@mui/x-data-grid';

// const TableGroop = () => {
//   const [groopData, setGroopData] = useState([]);

//   useEffect(() => {
//     // Fetch the data from the API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/groop');
//         setGroopData(response.data);


//         console.log("response.data" ,response.data)
//       } catch (error) {
//         console.error('Error fetching groop data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 150 },
//     { field: 'groopName', headerName: 'Groop Name', width: 150 },
//     {
//       field: 'groopRoutes',
//       headerName: 'Routes',
//       width: 300,
//       renderCell: (params) => (
//         <ul>
//           {params.value.map((route) => (
//             <li key={route?._id}>
//               {route?.route?.title} - {route?.permission}
//             </li>
//           ))}
//         </ul>
//       ),
//     },
//     {
//       field: 'groopUsers',
//       headerName: 'Users',
//       width: 300,
//       renderCell: (params) => (
//         <ul>
//           {params.value.map((user) => (
//             <li key={user._id}>{user.userName}</li>
//           ))}
//         </ul>
//       ),
//     },
//   ];

//   // Transform the groopData into rows for the DataGrid
//   const rows = groopData.map((groop) => ({
//     id: groop._id,
//     groopName: groop.groopName,
//     groopRoutes: groop.groopRoutes,
//     groopUsers: groop.groopUsers,
//   }));

//   return (
//     <div className="py-28" style={{ height: 600, width: '100%' }}>
//       <h1>Groop Table</h1>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={10}
//         rowsPerPageOptions={[10]}
//         checkboxSelection
//         disableSelectionOnClick
//       />
//     </div>
//   );
// };

// export default TableGroop;
