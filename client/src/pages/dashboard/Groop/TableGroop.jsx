import { useEffect, useState } from "react";
import axios from "axios";
import GroopCard from "@/components/GroopCard";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { error_toast, sucess_toast } from "@/utils/toastNotification";

const TableGroop = () => {
  const [groopData, setGroopData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <div className="z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 fixed flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 my-4 flex flex-col justify-between min-w-96">
          <h2 className="text-2xl font-semibold mb-4 text-center text-textSecLightColor">Are you sure?</h2>
          <div className="flex justify-between">
            <button
              onClick={closeDeleteModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              No
            </button>
            <button
              onClick={() => handleDelete(selectedGroop)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-7">
      <h1 className="text-center text-3xl my-7 text-primary font-medium">Groop Cards</h1>
      <div className="flex flex-wrap gap-14 mx-11  lg:justify-around  justify-center">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-6 my-4 text-center flex justify-center items-center min-w-96">
          <Link to="/dashboard/groop/create">
            <CiCirclePlus className="text-6xl text-primary" />
          </Link>
        </div>
        {groopData.map((groop) => (
          <GroopCard key={groop._id} groop={groop} onDelete={openDeleteModal} />
        ))}
      </div>
      {isModalOpen && <AreYouSure />} {/* Render modal if open */}
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
