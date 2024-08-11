// // import { useEffect, useState } from 'react';
// // import Navbar from '@/components/navbar';
// // import SideBar from '@/components/sidebar';
// // import { DataGrid } from '@mui/x-data-grid';
// // import { useStateContext } from '@/contexts/ContextProvider';
// // import axios from 'axios';
// // import Button from '@mui/material/Button';
// // import Dialog from '@mui/material/Dialog';
// // import DialogActions from '@mui/material/DialogActions';
// // import DialogContent from '@mui/material/DialogContent';
// // import DialogTitle from '@mui/material/DialogTitle';
// // import TextField from '@mui/material/TextField';
// // import IconButton from '@mui/material/IconButton';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import AddIcon from '@mui/icons-material/Add';
// // import { sucess_toast, error_toast } from '@/utils/toastNotification';

// // const Users = () => {
// //   const { isLoading } = useStateContext();
// //   const [usersData, setUsersData] = useState([]);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [dialogType, setDialogType] = useState('');
// //   const [selectedUser, setSelectedUser] = useState({ userName: '', email: '', password: '', groop: '' });
// //   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
// //   const [userToDelete, setUserToDelete] = useState(null);

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const fetchUsers = async () => {
// //     try {
// //       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
// //       const dataWithId = data.map((user, index) => ({ ...user, id: index + 1 }));
// //       setUsersData(dataWithId);
// //     } catch (error) {
// //       error_toast('Failed to fetch users');
// //       console.error(error);
// //     }
// //   };

// //   const handleCreateUser = async () => {
// //     try {
// //       const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users`, selectedUser);
// //       sucess_toast('User created successfully');
// //       setUsersData(prevState => [...prevState, { ...data, id: prevState.length + 1 }]);
// //       handleCloseDialog();
// //     } catch (error) {
// //       error_toast('Failed to create user');
// //       console.error(error);
// //     }
// //   };

// //   const handleUpdateUser = async () => {
// //     try {
// //       const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/users/${selectedUser._id}`, selectedUser);
// //       sucess_toast('User updated successfully');
// //       setUsersData(prevState => prevState.map(user => (user._id === data._id ? { ...data, id: user.id } : user)));
// //       handleCloseDialog();
// //     } catch (error) {
// //       error_toast('Failed to update user');
// //       console.error(error);
// //     }
// //   };

// //   const handleDeleteUser = async () => {
// //     try {
// //       await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userToDelete._id}`);
// //       sucess_toast('User deleted successfully');
// //       setUsersData(prevState => prevState.filter(user => user._id !== userToDelete._id));
// //       handleCloseConfirmDialog();
// //     } catch (error) {
// //       error_toast('Failed to delete user');
// //       console.error(error);
// //     }
// //   };

// //   const columns = [
// //     { field: 'id', headerName: 'ID', flex: 1 },
// //     { field: 'userName', headerName: 'User Name', flex: 2 },
// //     { field: 'email', headerName: 'Email', flex: 2 },
// //     { field: 'groop', headerName: 'Groop', flex: 2 },
// //     { field: 'createdAt', headerName: 'Created At', flex: 1 },
// //     { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
// //     {
// //       field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
// //         <>
// //           <IconButton 
// //             onClick={() => handleOpenDialog('update', params.row)}
// //             className="text-primary hover:text-darkPrimary transition-colors duration-300"
// //           >
// //             <EditIcon />
// //           </IconButton>
// //           <IconButton 
// //             onClick={() => handleOpenConfirmDialog(params.row)}
// //             className="text-accent hover:text-darkAccent transition-colors duration-300"
// //           >
// //             <DeleteIcon />
// //           </IconButton>
// //         </>
// //       )
// //     }
// //   ];

// //   const handleOpenDialog = (type, user = { userName: '', email: '', password: '', groop: '' }) => {
// //     setDialogType(type);
// //     setSelectedUser(user);
// //     setOpenDialog(true);
// //   };

// //   const handleCloseDialog = () => {
// //     setOpenDialog(false);
// //     setSelectedUser({ userName: '', email: '', password: '', groop: '' });
// //   };

// //   const handleOpenConfirmDialog = (user) => {
// //     setUserToDelete(user);
// //     setOpenConfirmDialog(true);
// //   };

// //   const handleCloseConfirmDialog = () => {
// //     setOpenConfirmDialog(false);
// //   };

// //   return  (
// //     <div className='min-h-screen bg-mainLightBg dark:bg-mainDarkBg text-textLightColor '>
// //       <Navbar />
// //       <SideBar />
// //       <div className='pt-28 flex flex-col items-center gap-7'>
// //         <h3 className='text-3xl font-semibold text-textLightColor  dark:text-textDarkColor leading-relaxed'>Users</h3>
// //         <Button 
// //           variant="contained" 
// //           className='bg-primary hover:bg-darkPrimary text-white shadow-lg rounded-xl'
// //           startIcon={<AddIcon />} 
// //           onClick={() => handleOpenDialog('create')}
// //         >
// //           Create User
// //         </Button>
// //         <div className='w-full max-w-7xl  shadow-2xl rounded-lg' style={{ height: '600px' }}>
// //           <DataGrid
// //             rows={usersData}
// //             columns={columns}
// //             pageSize={10}
// //             rowsPerPageOptions={[10, 25, 50]}
// //             disableSelectionOnClick
// //             checkboxSelection={false}
// //             loading={isLoading} 
// //             className='m-4  border-none bg-[#f9fafb] text-textLightColor '
// //             sx={{
// //               // Row background color
// //               '& .MuiDataGrid-row': {
// //                 backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#f9fafb',
// //                 '&:nth-of-type(even)': {
// //                   backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#111827' : '#e5e7eb',
// //                 },
// //                 '&:hover:nth-of-type(even)': {
// //                   backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2d3748' : '#e2e8f0', // Customize hover color here
// //                 },
// //                 // Row hover color
// //                 '&:hover': {
// //                   backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2d3748' : '#e2e8f0', // Customize hover color here
// //                 },
// //               },
// //               // Row text color
// //               '& .MuiDataGrid-cell': {
// //                 color: (theme) => theme.palette.mode === 'dark' ? '#e5e7eb' : '#1f2937', // Customize text color here
// //               },
// //             }}
// //           />
// //         </div>
// //       </div>
// //       <Dialog open={openDialog} onClose={handleCloseDialog}>
// //         <DialogTitle>{dialogType === 'create' ? 'Create User' : 'Update User'}</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             label="User Name"
// //             value={selectedUser.userName}
// //             onChange={(e) => setSelectedUser({ ...selectedUser, userName: e.target.value })}
// //             fullWidth
// //             margin="normal"
// //             className="text-primary"
// //           />
// //           <TextField
// //             label="Email"
// //             value={selectedUser.email}
// //             onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
// //             fullWidth
// //             margin="normal"
// //           />
// //           <TextField
// //             label="Password"
// //             type="password"
// //             value={selectedUser.password}
// //             onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
// //             fullWidth
// //             margin="normal"
// //           />
// //           <TextField
// //             label="Groop"
// //             value={selectedUser.groop}
// //             onChange={(e) => setSelectedUser({ ...selectedUser, groop: e.target.value })}
// //             fullWidth
// //             margin="normal"
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleCloseDialog} color="primary">
// //             Cancel
// //           </Button>
// //           <Button 
// //             onClick={dialogType === 'create' ? handleCreateUser : handleUpdateUser} 
// //             color="primary"
// //           >
// //             {dialogType === 'create' ? 'Create' : 'Update'}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //       <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
// //         <DialogTitle>Confirm Delete</DialogTitle>
// //         <DialogContent>
// //           Are you sure you want to delete {userToDelete?.userName}?
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleCloseConfirmDialog} color="primary">
// //             Cancel
// //           </Button>
// //           <Button onClick={handleDeleteUser} color="secondary">
// //             Delete
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </div>
// //   );
// // };

// // export default Users;

// import { useEffect, useState } from "react";
// import Navbar from "@/components/navbar";
// import SideBar from "@/components/sidebar";
// import { DataGrid } from "@mui/x-data-grid";
// import { useStateContext } from "@/contexts/ContextProvider";
// import axios from "axios";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import { sucess_toast, error_toast } from "@/utils/toastNotification";
// // import CreateRoute from "./CreateRoute";

// const Routes = () => {
//   const { isLoading ,setShowNew , showNew } = useStateContext();
//   const [routesData, setRoutesData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [dialogType, setDialogType] = useState("");
//   const [selectedRoute, setSelectedRoute] = useState({
//     path: "",
//     view: "",
//     image: "" ,
//     details:"",
//   });
//   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [routeToDelete, setRouteToDelete] = useState(null);

//   useEffect(() => {
//     fetchRoutes();
//   }, []);

//   const fetchRoutes = async () => {
//     try {
//       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
//       const dataWithId = data.map((route, index) => ({
//         ...route,
//         id: index + 1,
//       }));
//       setRoutesData(dataWithId);
//     } catch (error) {
//       error_toast(
//         `Failed to create route: ${
//           error.response ? error.response.data.message : error.message
//         }`
//       );
//       console.error(error);
//     }
//   };

//   const handleCreateRoute = async () => {
//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/route`,
//         selectedRoute
//       );
//       sucess_toast("Route created successfully");
//       setRoutesData((prevState) => [
//         ...prevState,
//         { ...data, id: prevState.length + 1 },
//       ]);
//       handleCloseDialog();
//     } catch (error) {
//       error_toast(
//         `Failed to create route: ${
//           error.response ? error.response.data.message : error.message
//         }`
//       );
//       console.error(error);
//     }
//   };

//   const handleUpdateRoute = async () => {
//     try {
//       const { data } = await axios.patch(
//         `${import.meta.env.VITE_API_URL}/route/${selectedRoute._id}`,
//         selectedRoute
//       );
//       sucess_toast("Route updated successfully");
//       setRoutesData((prevState) =>
//         prevState.map((route) =>
//           route._id === data._id ? { ...data, id: route.id } : route
//         )
//       );
//       handleCloseDialog();
//     } catch (error) {
//       error_toast(
//         `Failed to create route: ${
//           error.response ? error.response.data.message : error.message
//         }`
//       );
//       console.error(error);
//     }
//   };

//   const handleDeleteRoute = async () => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_URL}/route/${routeToDelete._id}`
//       );
//       sucess_toast("Route deleted successfully");
//       setRoutesData((prevState) =>
//         prevState.filter((route) => route._id !== routeToDelete._id)
//       );
//       handleCloseConfirmDialog();
//     } catch (error) {
//       error_toast(
//         `Failed to create route: ${
//           error.response ? error.response.data.message : error.message
//         }`
//       );
//       console.error(error);
//     }
//   };

//   const columns = [
//     { field: "id", headerName: "ID", flex: 1 },
//     { field: "path", headerName: "Path", flex: 2 },
//     { field: "view", headerName: "View", flex: 2 },
//     { field: "details", headerName: "Details", flex: 2 },
//     { field: "createdAt", headerName: "Created At", flex: 1 },
//     { field: "updatedAt", headerName: "Updated At", flex: 1 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <>
//           <IconButton
//             onClick={() => handleOpenDialog("update", params.row)}
//             className="text-primary hover:text-darkPrimary transition-colors duration-300"
//           >
//             <EditIcon />
//           </IconButton>
//           <IconButton
//             onClick={() => handleOpenConfirmDialog(params.row)}
//             className="text-accent hover:text-darkAccent transition-colors duration-300"
//           >
//             <DeleteIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   const handleOpenDialog = (type, route = { path: "", view: "",  image: "" , details:"" }) => {
//     setShowNew(true);
//     setDialogType(type);
//     setSelectedRoute(route);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedRoute({ path: "", view: "", image: "" , details:"" });
//   };

//   const handleOpenConfirmDialog = (route) => {
//     setRouteToDelete(route);
//     setOpenConfirmDialog(true);
//   };

//   const handleCloseConfirmDialog = () => {
//     setOpenConfirmDialog(false);
//   };


//   return (
//     <div className="min-h-screen bg-mainLightBg dark:bg-mainDarkBg text-textLightColor ">
//       <Navbar />
//       <SideBar />
//       <div className="pt-28 flex flex-col items-center gap-7">
//         <h3 className="text-3xl font-semibold text-textLightColor  dark:text-textDarkColor leading-relaxed">
//           Routes
//         </h3>
//         <Button
//           variant="contained"
//           className="bg-primary hover:bg-darkPrimary text-white shadow-lg rounded-xl"
//           startIcon={<AddIcon />}
//           onClick={() => setShowNew(true)}
//         >
//           Create Route
//         </Button>
//         <div
//           className="w-full max-w-7xl  shadow-2xl rounded-lg"
//           style={{ height: "600px" }}
//         >
//           <DataGrid
//             rows={routesData}
//             columns={columns}
//             pageSize={10}
//             rowsPerPageOptions={[10, 25, 50]}
//             disableSelectionOnClick
//             checkboxSelection={false}
//             loading={isLoading}
//             className="m-4  border-none bg-[#f9fafb] text-textLightColor "
//             sx={{
//               "& .MuiDataGrid-row": {
//                 backgroundColor: (theme) =>
//                   theme.palette.mode === "dark" ? "#1f2937" : "#f9fafb",
//                 "&:nth-of-type(even)": {
//                   backgroundColor: (theme) =>
//                     theme.palette.mode === "dark" ? "#111827" : "#e5e7eb",
//                 },
//                 "&:hover:nth-of-type(even)": {
//                   backgroundColor: (theme) =>
//                     theme.palette.mode === "dark" ? "#2d3748" : "#e2e8f0",
//                 },
//                 "&:hover": {
//                   backgroundColor: (theme) =>
//                     theme.palette.mode === "dark" ? "#2d3748" : "#e2e8f0",
//                 },
//               },
//               "& .MuiDataGrid-cell": {
//                 color: (theme) =>
//                   theme.palette.mode === "dark" ? "#d1d5db" : "#374151",
//               },
//               "& .MuiDataGrid-columnHeaders": {
//                 backgroundColor: (theme) =>
//                   theme.palette.mode === "dark" ? "#374151" : "#f3f4f6",
//                 color: (theme) =>
//                   theme.palette.mode === "dark" ? "#e5e7eb" : "#111827",
//               },
//               "& .MuiDataGrid-footerContainer": {
//                 backgroundColor: (theme) =>
//                   theme.palette.mode === "dark" ? "#374151" : "#f3f4f6",
//                 color: (theme) =>
//                   theme.palette.mode === "dark" ? "#e5e7eb" : "#111827",
//               },
//             }}
//           />
//         </div>
//       </div>
//       {/* {showNew && 
//        <CreateRoute selectedRout={selectedRoute} />
//       }
//        */}
//        <Dialog open={showNew} onClose={handleCloseDialog}>
//         <DialogTitle className="bg-secLightBg  text-textLightColor ">
//         {dialogType === "create" ? "Create Route" : "Update Route"}
//         </DialogTitle>
//         <DialogContent className="bg-secLightBg text-textLightColor">
//           <TextField
//             label="Path"
//             fullWidth
//             margin="normal"
//             value={selectedRoute.path}
//             placeholder="/"
//             onChange={(e) =>
//               setSelectedRoute({ ...selectedRoute, path: e.target.value })
//             }
//           />
//           <TextField
//             label="View"
//             fullWidth
//             margin="normal"
//             value={selectedRoute.view}
//             onChange={(e) =>
//               setSelectedRoute({ ...selectedRoute, view: e.target.value })
//             }
//           />
//           <TextField
//             label="Image"
//             fullWidth
//             margin="normal"
//             value={selectedRoute.image}
//             onChange={(e) =>
//               setSelectedRoute({ ...selectedRoute, image: e.target.value })
//             }
//           />
//           <TextField
//             label="Details"
//             fullWidth
//             margin="normal"
//             value={selectedRoute.details}
//             onChange={(e) =>
//               setSelectedRoute({ ...selectedRoute, details: e.target.value })
//             }
//           />
          
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button
//             onClick={dialogType === "create" ? handleCreateRoute : handleUpdateRoute}
//             color="primary"
//           >
//             {dialogType === "create" ? "Create" : "Update"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
//         <DialogTitle className="bg-secLightBg text-textLightColor">Confirm Deletion</DialogTitle>
//         <DialogContent className="bg-secLightBg text-textLightColor">
//           Are you sure you want to delete this route?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseConfirmDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteRoute} color="secondary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Routes;

import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import SideBar from "../../../components/sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CreateRoute from "./CreateRoute";
import ConfirmDialog from "../../../components/ConfirmDialog"; // Import the new ConfirmDialog component

import { sucess_toast, error_toast } from "../../../utils/toastNotification";

const Routes = () => {
  const { isLoading } = useStateContext();
  const [routesData, setRoutesData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [selectedRoute, setSelectedRoute] = useState({
    title: "",
    path: "",
    view: "",
    image: "",
    details: "",
    data: {},
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
      const dataWithId = data.map((route, index) => ({
        ...route,
        id: index + 1,
      }));
      setRoutesData(dataWithId);
    } catch (error) {
      error_toast(
        `Failed to create route: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
    }
  };

  const handleDeleteRoute = async () => {
    if (!routeToDelete) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/route/${routeToDelete._id}`);
      sucess_toast("Route deleted successfully");
      setRoutesData((prevState) =>
        prevState.filter((r) => r._id !== routeToDelete._id)
      );
      handleCloseConfirmDialog();
    } catch (error) {
      error_toast(
        `Failed to delete route: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error(error);
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

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "path", headerName: "Path", flex: 2 },
    { field: "view", headerName: "View", flex: 2 },
    { field: "image", headerName: "Image", flex: 2 },
    { field: "details", headerName: "Details", flex: 2 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleOpenDialog("update", params.row)}
            className="text-primary hover:text-darkPrimary transition-colors duration-300"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleOpenConfirmDialog(params.row)}
            className="text-accent hover:text-darkAccent transition-colors duration-300"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleOpenDialog = (type, route = null) => {
    setDialogType(type);
    setSelectedRoute(
      route || {
        title: "",
        path: "",
        view: "",
        image: "",
        details: "",
        data: {},
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoute({});
  };

  return (
    <div className="flex flex-col flex-grow h-screen">
      <Navbar />
      <div className="flex flex-grow overflow-hidden">
        <SideBar />
        <div className="flex-grow p-6 overflow-auto pt-28">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-primary">
              Routes Management
            </h1>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog("create")}
              className="bg-primary hover:bg-darkPrimary transition-colors duration-300"
            >
              Add Route
            </Button>
          </div>
          <div className="w-full">
            <DataGrid
              rows={routesData}
              columns={columns}
              pageSize={10}
              autoHeight
              loading={isLoading}
              disableSelectionOnClick
              disableColumnMenu
            />
          </div>
          <CreateRoute
            open={openDialog}
            handleClose={handleCloseDialog}
            dialogType={dialogType}
            selectedRoute={selectedRoute}
            setSelectedRoute={setSelectedRoute}
            handleCreateOrUpdate={
              dialogType === "create" ? handleCreateRoute : handleUpdateRoute
            }
          />
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={openConfirmDialog}
        handleClose={handleCloseConfirmDialog}
        handleConfirm={handleDeleteRoute}
        title="Confirm Deletion"
        message="Are you sure you want to delete this route? This action cannot be undone."
      />
    </div>
  );
};

export default Routes;
