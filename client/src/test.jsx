// // // // // import { useEffect, useState } from 'react';
// // // // // import Navbar from '@/components/navbar';
// // // // // import SideBar from '@/components/sidebar';
// // // // // import { DataGrid } from '@mui/x-data-grid';
// // // // // import { useStateContext } from '@/contexts/ContextProvider';
// // // // // import axios from 'axios';
// // // // // import Button from '@mui/material/Button';
// // // // // import Dialog from '@mui/material/Dialog';
// // // // // import DialogActions from '@mui/material/DialogActions';
// // // // // import DialogContent from '@mui/material/DialogContent';
// // // // // import DialogTitle from '@mui/material/DialogTitle';
// // // // // import TextField from '@mui/material/TextField';
// // // // // import IconButton from '@mui/material/IconButton';
// // // // // import EditIcon from '@mui/icons-material/Edit';
// // // // // import DeleteIcon from '@mui/icons-material/Delete';
// // // // // import AddIcon from '@mui/icons-material/Add';
// // // // // import { sucess_toast, error_toast } from '@/utils/toastNotification';

// // // // // const Users = () => {
// // // // //   const { isLoading } = useStateContext();
// // // // //   const [usersData, setUsersData] = useState([]);
// // // // //   const [openDialog, setOpenDialog] = useState(false);
// // // // //   const [dialogType, setDialogType] = useState('');
// // // // //   const [selectedUser, setSelectedUser] = useState({ userName: '', email: '', password: '', groop: '' });
// // // // //   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
// // // // //   const [userToDelete, setUserToDelete] = useState(null);

// // // // //   useEffect(() => {
// // // // //     fetchUsers();
// // // // //   }, []);

// // // // //   const fetchUsers = async () => {
// // // // //     try {
// // // // //       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
// // // // //       const dataWithId = data.map((user, index) => ({ ...user, id: index + 1 }));
// // // // //       setUsersData(dataWithId);
// // // // //     } catch (error) {
// // // // //       error_toast('Failed to fetch users');
// // // // //       console.error(error);
// // // // //     }
// // // // //   };

// // // // //   const handleCreateUser = async () => {
// // // // //     try {
// // // // //       const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users`, selectedUser);
// // // // //       sucess_toast('User created successfully');
// // // // //       setUsersData(prevState => [...prevState, { ...data, id: prevState.length + 1 }]);
// // // // //       handleCloseDialog();
// // // // //     } catch (error) {
// // // // //       error_toast('Failed to create user');
// // // // //       console.error(error);
// // // // //     }
// // // // //   };

// // // // //   const handleUpdateUser = async () => {
// // // // //     try {
// // // // //       const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/users/${selectedUser._id}`, selectedUser);
// // // // //       sucess_toast('User updated successfully');
// // // // //       setUsersData(prevState => prevState.map(user => (user._id === data._id ? { ...data, id: user.id } : user)));
// // // // //       handleCloseDialog();
// // // // //     } catch (error) {
// // // // //       error_toast('Failed to update user');
// // // // //       console.error(error);
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteUser = async () => {
// // // // //     try {
// // // // //       await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userToDelete._id}`);
// // // // //       sucess_toast('User deleted successfully');
// // // // //       setUsersData(prevState => prevState.filter(user => user._id !== userToDelete._id));
// // // // //       handleCloseConfirmDialog();
// // // // //     } catch (error) {
// // // // //       error_toast('Failed to delete user');
// // // // //       console.error(error);
// // // // //     }
// // // // //   };

// // // // //   const columns = [
// // // // //     { field: 'id', headerName: 'ID', flex: 1 },
// // // // //     { field: 'userName', headerName: 'User Name', flex: 2 },
// // // // //     { field: 'email', headerName: 'Email', flex: 2 },
// // // // //     { field: 'groop', headerName: 'Groop', flex: 2 },
// // // // //     { field: 'createdAt', headerName: 'Created At', flex: 1 },
// // // // //     { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
// // // // //     {
// // // // //       field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
// // // // //         <>
// // // // //           <IconButton 
// // // // //             onClick={() => handleOpenDialog('update', params.row)}
// // // // //             className="text-primary hover:text-darkPrimary transition-colors duration-300"
// // // // //           >
// // // // //             <EditIcon />
// // // // //           </IconButton>
// // // // //           <IconButton 
// // // // //             onClick={() => handleOpenConfirmDialog(params.row)}
// // // // //             className="text-accent hover:text-darkAccent transition-colors duration-300"
// // // // //           >
// // // // //             <DeleteIcon />
// // // // //           </IconButton>
// // // // //         </>
// // // // //       )
// // // // //     }
// // // // //   ];

// // // // //   const handleOpenDialog = (type, user = { userName: '', email: '', password: '', groop: '' }) => {
// // // // //     setDialogType(type);
// // // // //     setSelectedUser(user);
// // // // //     setOpenDialog(true);
// // // // //   };

// // // // //   const handleCloseDialog = () => {
// // // // //     setOpenDialog(false);
// // // // //     setSelectedUser({ userName: '', email: '', password: '', groop: '' });
// // // // //   };

// // // // //   const handleOpenConfirmDialog = (user) => {
// // // // //     setUserToDelete(user);
// // // // //     setOpenConfirmDialog(true);
// // // // //   };

// // // // //   const handleCloseConfirmDialog = () => {
// // // // //     setOpenConfirmDialog(false);
// // // // //   };

// // // // //   return  (
// // // // //     <div className='min-h-screen bg-mainLightBg dark:bg-mainDarkBg text-textLightColor '>
// // // // //       <Navbar />
// // // // //       <SideBar />
// // // // //       <div className='pt-28 flex flex-col items-center gap-7'>
// // // // //         <h3 className='text-3xl font-semibold text-textLightColor  dark:text-textDarkColor leading-relaxed'>Users</h3>
// // // // //         <Button 
// // // // //           variant="contained" 
// // // // //           className='bg-primary hover:bg-darkPrimary text-white shadow-lg rounded-xl'
// // // // //           startIcon={<AddIcon />} 
// // // // //           onClick={() => handleOpenDialog('create')}
// // // // //         >
// // // // //           Create User
// // // // //         </Button>
// // // // //         <div className='w-full max-w-7xl  shadow-2xl rounded-lg' style={{ height: '600px' }}>
// // // // //           <DataGrid
// // // // //             rows={usersData}
// // // // //             columns={columns}
// // // // //             pageSize={10}
// // // // //             rowsPerPageOptions={[10, 25, 50]}
// // // // //             disableSelectionOnClick
// // // // //             checkboxSelection={false}
// // // // //             loading={isLoading} 
// // // // //             className='m-4  border-none bg-[#f9fafb] text-textLightColor '
// // // // //             sx={{
// // // // //               // Row background color
// // // // //               '& .MuiDataGrid-row': {
// // // // //                 backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#f9fafb',
// // // // //                 '&:nth-of-type(even)': {
// // // // //                   backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#111827' : '#e5e7eb',
// // // // //                 },
// // // // //                 '&:hover:nth-of-type(even)': {
// // // // //                   backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2d3748' : '#e2e8f0', // Customize hover color here
// // // // //                 },
// // // // //                 // Row hover color
// // // // //                 '&:hover': {
// // // // //                   backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2d3748' : '#e2e8f0', // Customize hover color here
// // // // //                 },
// // // // //               },
// // // // //               // Row text color
// // // // //               '& .MuiDataGrid-cell': {
// // // // //                 color: (theme) => theme.palette.mode === 'dark' ? '#e5e7eb' : '#1f2937', // Customize text color here
// // // // //               },
// // // // //             }}
// // // // //           />
// // // // //         </div>
// // // // //       </div>
// // // // //       <Dialog open={openDialog} onClose={handleCloseDialog}>
// // // // //         <DialogTitle>{dialogType === 'create' ? 'Create User' : 'Update User'}</DialogTitle>
// // // // //         <DialogContent>
// // // // //           <TextField
// // // // //             label="User Name"
// // // // //             value={selectedUser.userName}
// // // // //             onChange={(e) => setSelectedUser({ ...selectedUser, userName: e.target.value })}
// // // // //             fullWidth
// // // // //             margin="normal"
// // // // //             className="text-primary"
// // // // //           />
// // // // //           <TextField
// // // // //             label="Email"
// // // // //             value={selectedUser.email}
// // // // //             onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
// // // // //             fullWidth
// // // // //             margin="normal"
// // // // //           />
// // // // //           <TextField
// // // // //             label="Password"
// // // // //             type="password"
// // // // //             value={selectedUser.password}
// // // // //             onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
// // // // //             fullWidth
// // // // //             margin="normal"
// // // // //           />
// // // // //           <TextField
// // // // //             label="Groop"
// // // // //             value={selectedUser.groop}
// // // // //             onChange={(e) => setSelectedUser({ ...selectedUser, groop: e.target.value })}
// // // // //             fullWidth
// // // // //             margin="normal"
// // // // //           />
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={handleCloseDialog} color="primary">
// // // // //             Cancel
// // // // //           </Button>
// // // // //           <Button 
// // // // //             onClick={dialogType === 'create' ? handleCreateUser : handleUpdateUser} 
// // // // //             color="primary"
// // // // //           >
// // // // //             {dialogType === 'create' ? 'Create' : 'Update'}
// // // // //           </Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>
// // // // //       <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
// // // // //         <DialogTitle>Confirm Delete</DialogTitle>
// // // // //         <DialogContent>
// // // // //           Are you sure you want to delete {userToDelete?.userName}?
// // // // //         </DialogContent>
// // // // //         <DialogActions>
// // // // //           <Button onClick={handleCloseConfirmDialog} color="primary">
// // // // //             Cancel
// // // // //           </Button>
// // // // //           <Button onClick={handleDeleteUser} color="secondary">
// // // // //             Delete
// // // // //           </Button>
// // // // //         </DialogActions>
// // // // //       </Dialog>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Users;

// // // // import { useEffect, useState } from "react";
// // // // import Navbar from "@/components/navbar";
// // // // import SideBar from "@/components/sidebar";
// // // // import { DataGrid } from "@mui/x-data-grid";
// // // // import { useStateContext } from "@/contexts/ContextProvider";
// // // // import axios from "axios";
// // // // import Button from "@mui/material/Button";
// // // // import Dialog from "@mui/material/Dialog";
// // // // import DialogActions from "@mui/material/DialogActions";
// // // // import DialogContent from "@mui/material/DialogContent";
// // // // import DialogTitle from "@mui/material/DialogTitle";
// // // // import TextField from "@mui/material/TextField";
// // // // import IconButton from "@mui/material/IconButton";
// // // // import EditIcon from "@mui/icons-material/Edit";
// // // // import DeleteIcon from "@mui/icons-material/Delete";
// // // // import AddIcon from "@mui/icons-material/Add";
// // // // import { sucess_toast, error_toast } from "@/utils/toastNotification";
// // // // // import CreateRoute from "./CreateRoute";

// // // // const Routes = () => {
// // // //   const { isLoading ,setShowNew , showNew } = useStateContext();
// // // //   const [routesData, setRoutesData] = useState([]);
// // // //   const [openDialog, setOpenDialog] = useState(false);
// // // //   const [dialogType, setDialogType] = useState("");
// // // //   const [selectedRoute, setSelectedRoute] = useState({
// // // //     path: "",
// // // //     view: "",
// // // //     image: "" ,
// // // //     details:"",
// // // //   });
// // // //   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
// // // //   const [routeToDelete, setRouteToDelete] = useState(null);

// // // //   useEffect(() => {
// // // //     fetchRoutes();
// // // //   }, []);

// // // //   const fetchRoutes = async () => {
// // // //     try {
// // // //       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
// // // //       const dataWithId = data.map((route, index) => ({
// // // //         ...route,
// // // //         id: index + 1,
// // // //       }));
// // // //       setRoutesData(dataWithId);
// // // //     } catch (error) {
// // // //       error_toast(
// // // //         `Failed to create route: ${
// // // //           error.response ? error.response.data.message : error.message
// // // //         }`
// // // //       );
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // //   const handleCreateRoute = async () => {
// // // //     try {
// // // //       const { data } = await axios.post(
// // // //         `${import.meta.env.VITE_API_URL}/route`,
// // // //         selectedRoute
// // // //       );
// // // //       sucess_toast("Route created successfully");
// // // //       setRoutesData((prevState) => [
// // // //         ...prevState,
// // // //         { ...data, id: prevState.length + 1 },
// // // //       ]);
// // // //       handleCloseDialog();
// // // //     } catch (error) {
// // // //       error_toast(
// // // //         `Failed to create route: ${
// // // //           error.response ? error.response.data.message : error.message
// // // //         }`
// // // //       );
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // //   const handleUpdateRoute = async () => {
// // // //     try {
// // // //       const { data } = await axios.patch(
// // // //         `${import.meta.env.VITE_API_URL}/route/${selectedRoute._id}`,
// // // //         selectedRoute
// // // //       );
// // // //       sucess_toast("Route updated successfully");
// // // //       setRoutesData((prevState) =>
// // // //         prevState.map((route) =>
// // // //           route._id === data._id ? { ...data, id: route.id } : route
// // // //         )
// // // //       );
// // // //       handleCloseDialog();
// // // //     } catch (error) {
// // // //       error_toast(
// // // //         `Failed to create route: ${
// // // //           error.response ? error.response.data.message : error.message
// // // //         }`
// // // //       );
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // //   const handleDeleteRoute = async () => {
// // // //     try {
// // // //       await axios.delete(
// // // //         `${import.meta.env.VITE_API_URL}/route/${routeToDelete._id}`
// // // //       );
// // // //       sucess_toast("Route deleted successfully");
// // // //       setRoutesData((prevState) =>
// // // //         prevState.filter((route) => route._id !== routeToDelete._id)
// // // //       );
// // // //       handleCloseConfirmDialog();
// // // //     } catch (error) {
// // // //       error_toast(
// // // //         `Failed to create route: ${
// // // //           error.response ? error.response.data.message : error.message
// // // //         }`
// // // //       );
// // // //       console.error(error);
// // // //     }
// // // //   };

// // // //   const columns = [
// // // //     { field: "id", headerName: "ID", flex: 1 },
// // // //     { field: "path", headerName: "Path", flex: 2 },
// // // //     { field: "view", headerName: "View", flex: 2 },
// // // //     { field: "details", headerName: "Details", flex: 2 },
// // // //     { field: "createdAt", headerName: "Created At", flex: 1 },
// // // //     { field: "updatedAt", headerName: "Updated At", flex: 1 },
// // // //     {
// // // //       field: "actions",
// // // //       headerName: "Actions",
// // // //       flex: 1,
// // // //       renderCell: (params) => (
// // // //         <>
// // // //           <IconButton
// // // //             onClick={() => handleOpenDialog("update", params.row)}
// // // //             className="text-primary hover:text-darkPrimary transition-colors duration-300"
// // // //           >
// // // //             <EditIcon />
// // // //           </IconButton>
// // // //           <IconButton
// // // //             onClick={() => handleOpenConfirmDialog(params.row)}
// // // //             className="text-accent hover:text-darkAccent transition-colors duration-300"
// // // //           >
// // // //             <DeleteIcon />
// // // //           </IconButton>
// // // //         </>
// // // //       ),
// // // //     },
// // // //   ];

// // // //   const handleOpenDialog = (type, route = { path: "", view: "",  image: "" , details:"" }) => {
// // // //     setShowNew(true);
// // // //     setDialogType(type);
// // // //     setSelectedRoute(route);
// // // //     setOpenDialog(true);
// // // //   };

// // // //   const handleCloseDialog = () => {
// // // //     setOpenDialog(false);
// // // //     setSelectedRoute({ path: "", view: "", image: "" , details:"" });
// // // //   };

// // // //   const handleOpenConfirmDialog = (route) => {
// // // //     setRouteToDelete(route);
// // // //     setOpenConfirmDialog(true);
// // // //   };

// // // //   const handleCloseConfirmDialog = () => {
// // // //     setOpenConfirmDialog(false);
// // // //   };


// // // //   return (
// // // //     <div className="min-h-screen bg-mainLightBg dark:bg-mainDarkBg text-textLightColor ">
// // // //       <Navbar />
// // // //       <SideBar />
// // // //       <div className="pt-28 flex flex-col items-center gap-7">
// // // //         <h3 className="text-3xl font-semibold text-textLightColor  dark:text-textDarkColor leading-relaxed">
// // // //           Routes
// // // //         </h3>
// // // //         <Button
// // // //           variant="contained"
// // // //           className="bg-primary hover:bg-darkPrimary text-white shadow-lg rounded-xl"
// // // //           startIcon={<AddIcon />}
// // // //           onClick={() => setShowNew(true)}
// // // //         >
// // // //           Create Route
// // // //         </Button>
// // // //         <div
// // // //           className="w-full max-w-7xl  shadow-2xl rounded-lg"
// // // //           style={{ height: "600px" }}
// // // //         >
// // // //           <DataGrid
// // // //             rows={routesData}
// // // //             columns={columns}
// // // //             pageSize={10}
// // // //             rowsPerPageOptions={[10, 25, 50]}
// // // //             disableSelectionOnClick
// // // //             checkboxSelection={false}
// // // //             loading={isLoading}
// // // //             className="m-4  border-none bg-[#f9fafb] text-textLightColor "
// // // //             sx={{
// // // //               "& .MuiDataGrid-row": {
// // // //                 backgroundColor: (theme) =>
// // // //                   theme.palette.mode === "dark" ? "#1f2937" : "#f9fafb",
// // // //                 "&:nth-of-type(even)": {
// // // //                   backgroundColor: (theme) =>
// // // //                     theme.palette.mode === "dark" ? "#111827" : "#e5e7eb",
// // // //                 },
// // // //                 "&:hover:nth-of-type(even)": {
// // // //                   backgroundColor: (theme) =>
// // // //                     theme.palette.mode === "dark" ? "#2d3748" : "#e2e8f0",
// // // //                 },
// // // //                 "&:hover": {
// // // //                   backgroundColor: (theme) =>
// // // //                     theme.palette.mode === "dark" ? "#2d3748" : "#e2e8f0",
// // // //                 },
// // // //               },
// // // //               "& .MuiDataGrid-cell": {
// // // //                 color: (theme) =>
// // // //                   theme.palette.mode === "dark" ? "#d1d5db" : "#374151",
// // // //               },
// // // //               "& .MuiDataGrid-columnHeaders": {
// // // //                 backgroundColor: (theme) =>
// // // //                   theme.palette.mode === "dark" ? "#374151" : "#f3f4f6",
// // // //                 color: (theme) =>
// // // //                   theme.palette.mode === "dark" ? "#e5e7eb" : "#111827",
// // // //               },
// // // //               "& .MuiDataGrid-footerContainer": {
// // // //                 backgroundColor: (theme) =>
// // // //                   theme.palette.mode === "dark" ? "#374151" : "#f3f4f6",
// // // //                 color: (theme) =>
// // // //                   theme.palette.mode === "dark" ? "#e5e7eb" : "#111827",
// // // //               },
// // // //             }}
// // // //           />
// // // //         </div>
// // // //       </div>
// // // //       {/* {showNew && 
// // // //        <CreateRoute selectedRout={selectedRoute} />
// // // //       }
// // // //        */}
// // // //        <Dialog open={showNew} onClose={handleCloseDialog}>
// // // //         <DialogTitle className="bg-secLightBg  text-textLightColor ">
// // // //         {dialogType === "create" ? "Create Route" : "Update Route"}
// // // //         </DialogTitle>
// // // //         <DialogContent className="bg-secLightBg text-textLightColor">
// // // //           <TextField
// // // //             label="Path"
// // // //             fullWidth
// // // //             margin="normal"
// // // //             value={selectedRoute.path}
// // // //             placeholder="/"
// // // //             onChange={(e) =>
// // // //               setSelectedRoute({ ...selectedRoute, path: e.target.value })
// // // //             }
// // // //           />
// // // //           <TextField
// // // //             label="View"
// // // //             fullWidth
// // // //             margin="normal"
// // // //             value={selectedRoute.view}
// // // //             onChange={(e) =>
// // // //               setSelectedRoute({ ...selectedRoute, view: e.target.value })
// // // //             }
// // // //           />
// // // //           <TextField
// // // //             label="Image"
// // // //             fullWidth
// // // //             margin="normal"
// // // //             value={selectedRoute.image}
// // // //             onChange={(e) =>
// // // //               setSelectedRoute({ ...selectedRoute, image: e.target.value })
// // // //             }
// // // //           />
// // // //           <TextField
// // // //             label="Details"
// // // //             fullWidth
// // // //             margin="normal"
// // // //             value={selectedRoute.details}
// // // //             onChange={(e) =>
// // // //               setSelectedRoute({ ...selectedRoute, details: e.target.value })
// // // //             }
// // // //           />
          
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={handleCloseDialog} color="primary">
// // // //             Cancel
// // // //           </Button>
// // // //           <Button
// // // //             onClick={dialogType === "create" ? handleCreateRoute : handleUpdateRoute}
// // // //             color="primary"
// // // //           >
// // // //             {dialogType === "create" ? "Create" : "Update"}
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>
// // // //       <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
// // // //         <DialogTitle className="bg-secLightBg text-textLightColor">Confirm Deletion</DialogTitle>
// // // //         <DialogContent className="bg-secLightBg text-textLightColor">
// // // //           Are you sure you want to delete this route?
// // // //         </DialogContent>
// // // //         <DialogActions>
// // // //           <Button onClick={handleCloseConfirmDialog} color="primary">
// // // //             Cancel
// // // //           </Button>
// // // //           <Button onClick={handleDeleteRoute} color="secondary">
// // // //             Delete
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Routes;

// // // import { useEffect, useState } from "react";
// // // import Navbar from "../../../components/navbar";
// // // import SideBar from "../../../components/sidebar";
// // // import { DataGrid } from "@mui/x-data-grid";
// // // import { useStateContext } from "../../../contexts/ContextProvider";
// // // import axios from "axios";
// // // import Button from "@mui/material/Button";
// // // import IconButton from "@mui/material/IconButton";
// // // import EditIcon from "@mui/icons-material/Edit";
// // // import DeleteIcon from "@mui/icons-material/Delete";
// // // import AddIcon from "@mui/icons-material/Add";
// // // import CreateRoute from "./CreateRoute";
// // // import ConfirmDialog from "../../../components/ConfirmDialog"; // Import the new ConfirmDialog component

// // // import { sucess_toast, error_toast } from "../../../utils/toastNotification";

// // // const Routes = () => {
// // //   const { isLoading } = useStateContext();
// // //   const [routesData, setRoutesData] = useState([]);
// // //   const [openDialog, setOpenDialog] = useState(false);
// // //   const [dialogType, setDialogType] = useState("");
// // //   const [selectedRoute, setSelectedRoute] = useState({
// // //     title: "",
// // //     path: "",
// // //     view: "",
// // //     image: "",
// // //     details: "",
// // //     data: {},
// // //   });
// // //   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
// // //   const [routeToDelete, setRouteToDelete] = useState(null);

// // //   useEffect(() => {
// // //     fetchRoutes();
// // //   }, []);

// // //   const fetchRoutes = async () => {
// // //     try {
// // //       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
// // //       const dataWithId = data.map((route, index) => ({
// // //         ...route,
// // //         id: index + 1,
// // //       }));
// // //       setRoutesData(dataWithId);
// // //     } catch (error) {
// // //       error_toast(
// // //         `Failed to create route: ${
// // //           error.response ? error.response.data.message : error.message
// // //         }`
// // //       );
// // //       console.error(error);
// // //     }
// // //   };

// // //   const handleDeleteRoute = async () => {
// // //     if (!routeToDelete) return;
// // //     try {
// // //       await axios.delete(`${import.meta.env.VITE_API_URL}/route/${routeToDelete._id}`);
// // //       sucess_toast("Route deleted successfully");
// // //       setRoutesData((prevState) =>
// // //         prevState.filter((r) => r._id !== routeToDelete._id)
// // //       );
// // //       handleCloseConfirmDialog();
// // //     } catch (error) {
// // //       error_toast(
// // //         `Failed to delete route: ${
// // //           error.response ? error.response.data.message : error.message
// // //         }`
// // //       );
// // //       console.error(error);
// // //     }
// // //   };

// // //   const handleOpenConfirmDialog = (route) => {
// // //     setRouteToDelete(route);
// // //     setOpenConfirmDialog(true);
// // //   };

// // //   const handleCloseConfirmDialog = () => {
// // //     setOpenConfirmDialog(false);
// // //     setRouteToDelete(null);
// // //   };

// // //   const columns = [
// // //     { field: "id", headerName: "ID", flex: 1 },
// // //     { field: "path", headerName: "Path", flex: 2 },
// // //     { field: "view", headerName: "View", flex: 2 },
// // //     { field: "image", headerName: "Image", flex: 2 },
// // //     { field: "details", headerName: "Details", flex: 2 },
// // //     { field: "createdAt", headerName: "Created At", flex: 1 },
// // //     { field: "updatedAt", headerName: "Updated At", flex: 1 },
// // //     {
// // //       field: "actions",
// // //       headerName: "Actions",
// // //       flex: 1,
// // //       renderCell: (params) => (
// // //         <>
// // //           <IconButton
// // //             onClick={() => handleOpenDialog("update", params.row)}
// // //             className="text-primary hover:text-darkPrimary transition-colors duration-300"
// // //           >
// // //             <EditIcon />
// // //           </IconButton>
// // //           <IconButton
// // //             onClick={() => handleOpenConfirmDialog(params.row)}
// // //             className="text-accent hover:text-darkAccent transition-colors duration-300"
// // //           >
// // //             <DeleteIcon />
// // //           </IconButton>
// // //         </>
// // //       ),
// // //     },
// // //   ];

// // //   const handleOpenDialog = (type, route = null) => {
// // //     setDialogType(type);
// // //     setSelectedRoute(
// // //       route || {
// // //         title: "",
// // //         path: "",
// // //         view: "",
// // //         image: "",
// // //         details: "",
// // //         data: {},
// // //       }
// // //     );
// // //     setOpenDialog(true);
// // //   };

// // //   const handleCloseDialog = () => {
// // //     setOpenDialog(false);
// // //     setSelectedRoute({});
// // //   };

// // //   return (
// // //     <div className="flex flex-col flex-grow h-screen">
// // //       <Navbar />
// // //       <div className="flex flex-grow overflow-hidden">
// // //         <SideBar />
// // //         <div className="flex-grow p-6 overflow-auto pt-28">
// // //           <div className="flex justify-between items-center mb-6">
// // //             <h1 className="text-3xl font-semibold text-primary">
// // //               Routes Management
// // //             </h1>
// // //             <Button
// // //               variant="contained"
// // //               startIcon={<AddIcon />}
// // //               onClick={() => handleOpenDialog("create")}
// // //               className="bg-primary hover:bg-darkPrimary transition-colors duration-300"
// // //             >
// // //               Add Route
// // //             </Button>
// // //           </div>
// // //           <div className="w-full">
// // //             <DataGrid
// // //               rows={routesData}
// // //               columns={columns}
// // //               pageSize={10}
// // //               autoHeight
// // //               loading={isLoading}
// // //               disableSelectionOnClick
// // //               disableColumnMenu
// // //             />
// // //           </div>
// // //           <CreateRoute
// // //             open={openDialog}
// // //             handleClose={handleCloseDialog}
// // //             dialogType={dialogType}
// // //             selectedRoute={selectedRoute}
// // //             setSelectedRoute={setSelectedRoute}
// // //             handleCreateOrUpdate={
// // //               dialogType === "create" ? handleCreateRoute : handleUpdateRoute
// // //             }
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Confirmation Dialog */}
// // //       <ConfirmDialog
// // //         open={openConfirmDialog}
// // //         handleClose={handleCloseConfirmDialog}
// // //         handleConfirm={handleDeleteRoute}
// // //         title="Confirm Deletion"
// // //         message="Are you sure you want to delete this route? This action cannot be undone."
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default Routes;

// // import { useEffect, useState } from "react";
// // import Dialog from "@mui/material/Dialog";
// // import DialogActions from "@mui/material/DialogActions";
// // import DialogContent from "@mui/material/DialogContent";
// // import DialogTitle from "@mui/material/DialogTitle";
// // import TextField from "@mui/material/TextField";
// // import Select from "@mui/material/Select";
// // import MenuItem from "@mui/material/MenuItem";
// // import Button from "@mui/material/Button";
// // import axios from "axios";
// // import Slider from "react-slick";
// // import { error_toast } from "@/utils/toastNotification";
// // import ImageModal from "@/components/ImageModal"; // Import the ImageModal component

// // const CreateRoute = ({
// //   open,
// //   handleClose,
// //   dialogType,
// //   selectedRoute,
// //   setSelectedRoute,
// //   handleCreateOrUpdate,
// // }) => {
// //   const [routes, setRoutes] = useState([]);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState("");
// //   const [imagePreview, setImagePreview] = useState(null); // State to hold the image preview
// //   const [dataFields, setDataFields] = useState([{ key: "", value: "" }]); // Dynamic fields state

// //   useEffect(() => {
// //     fetchRoutes();
// //   }, []);

// //   const fetchRoutes = async () => {
// //     try {
// //       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
// //       setRoutes(data);
// //     } catch (error) {
// //       error_toast(
// //         `Failed to fetch routes: ${
// //           error.response ? error.response.data.message : error.message
// //         }`
// //       );
// //       console.error(error);
// //     }
// //   };

// //   const viewOptions = [
// //     { name: "View1", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View1.png` },
// //     { name: "View2", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View2.png` },
// //     { name: "View3", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View3.png` },
// //     { name: "View4", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View4.png` },
// //     { name: "View5", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View5.png` },
// //   ];

// //   const handleViewSelection = (viewName) => {
// //     setSelectedRoute({ ...selectedRoute, view: viewName });
// //   };

// //   const handleImageClick = (imgSrc) => {
// //     setSelectedImage(imgSrc); // Set selected image source
// //     setModalOpen(true);
// //   };

// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const fileName = file.name; // Get the file name with extension
// //       setSelectedRoute({ ...selectedRoute, image: fileName });

// //       // Create a preview URL for the selected image
// //       const previewUrl = URL.createObjectURL(file);
// //       setImagePreview(previewUrl);
// //     }
// //   };

// //   const settings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 3,
// //     slidesToScroll: 1,
// //   };

// //   const handleAddField = () => {
// //     setDataFields([...dataFields, { key: "", value: "" }]);
// //   };

// //   const handleRemoveField = (index) => {
// //     const fields = [...dataFields];
// //     fields.splice(index, 1);
// //     setDataFields(fields);
// //   };

// //   const handleFieldChange = (index, event) => {
// //     const fields = [...dataFields];
// //     fields[index][event.target.name] = event.target.value;
// //     setDataFields(fields);
// //   };

// //   const handleCreateOrUpdate = () => {
// //     const dataObject = dataFields.reduce((obj, item) => {
// //       if (item.key && item.value) {
// //         obj[item.key] = item.value;
// //       }
// //       return obj;
// //     }, {});

// //     const updatedRoute = {
// //       ...selectedRoute,
// //       data: dataObject,
// //     };

// //     // Call the passed function to handle create or update
// //     props.handleCreateOrUpdate(updatedRoute);
// //   };

// //   return (
// //     <>
// //       <Dialog
// //         open={open}
// //         onClose={handleClose}
// //         maxWidth="md"
// //         sx={{ "& .MuiDialog-paper": { width: "80%", overflowX: "hidden" } }} // Custom width
// //       >
// //         <DialogTitle className="bg-secLightBg text-textLightColor ">
// //           {dialogType === "create" ? "Create Route" : "Update Route"}
// //         </DialogTitle>
// //         <DialogContent 
// //           className="bg-secLightBg"
// //           sx={{ overflow: 'hidden' }} // Remove the scrollbar
// //         >
// //           <Select
// //             id="route-select"
// //             label="Parent Path"
// //             value={selectedRoute.parrentPath || "/" }
// //             onChange={(e) =>
// //               setSelectedRoute({
// //                 ...selectedRoute,
// //                 parrentPath: e.target.value,
// //               })
// //             }
// //             placeholder="Parent Path"
// //             fullWidth
// //             className="bg-secLightBg w-full"
// //             InputLabelProps={{ style: { color: "inherit" } }}
// //             InputProps={{ style: { color: "inherit" } }}
// //           >
// //             {routes.map((route) => (
// //               <MenuItem
// //                 key={route._id}
// //                 value={route._id}
// //               >
// //                 {route.path}
// //               </MenuItem>
// //             ))}
// //           </Select>

// //           <TextField
// //             autoFocus
// //             margin="dense"
// //             label="Title"
// //             type="text"
// //             fullWidth
// //             value={selectedRoute.title}
// //             onChange={(e) =>
// //               setSelectedRoute({ ...selectedRoute, title: e.target.value })
// //             }
// //             className="bg-secLightBg"
// //             InputLabelProps={{ style: { color: "inherit" } }}
// //             InputProps={{ style: { color: "inherit" } }}
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Path"
// //             type="text"
// //             fullWidth
// //             value={selectedRoute.path || "/"}
// //             onChange={(e) =>
// //               setSelectedRoute({ ...selectedRoute, path: e.target.value })
// //             }
// //             className="bg-secLightBg"
// //             InputLabelProps={{ style: { color: "inherit" } }}
// //             InputProps={{ style: { color: "inherit" } }}
// //           />

// //           <div className="m-4">
// //             <Slider {...settings}>
// //               {viewOptions.map((option) => (
// //                 <div
// //                   key={option.name}
// //                   onClick={() =>
// //                     handleViewSelection(option.name, option.imgSrc)
// //                   }
// //                   className={`cursor-pointer p-2 rounded-lg border-2 ${
// //                     selectedRoute.view === option.name
// //                       ? "border-primary shadow-lg"
// //                       : "border-transparent"
// //                   }`}
// //                 >
// //                   <img
// //                     src={option.imgSrc}
// //                     alt={option.name}
// //                     className="w-full h-32 object-cover rounded-lg"
// //                     onClick={() => handleImageClick(option.imgSrc)}
// //                   />
// //                   <p className="text-center mt-2">{option.name}</p>
// //                 </div>
// //               ))}
// //             </Slider>
// //           </div>

// //           {/* File Input for Image Selection */}
// //           <input
// //             accept="image/*"
// //             id="contained-button-file"
// //             type="file"
// //             onChange={handleImageUpload}
// //             className="mb-4 bg-secLightBg text-textLightColor"
// //           />
// //           {/* Display the image preview */}
// //           {imagePreview && (
// //             <div className="mb-4">
// //               <p className="text-textLightColor">Selected Image Preview:</p>
// //               <img
// //                 src={imagePreview}
// //                 alt="Image Preview"
// //                 className="h-32 object-cover rounded-lg mt-2"
// //               />
// //             </div>
// //           )}

// //           {/* Dynamic Data Fields */}
// //           <div className="mt-4">
// //             <h4 className="text-textLightColor">Dynamic Data Fields</h4>
// //             {dataFields.map((field, index) => (
// //               <div key={index} className="flex items-center gap-2 mb-2">
// //                 <TextField
// //                   label="Field Name"
// //                   name="key"
// //                   value={field.key}
// //                   onChange={(e) => handleFieldChange(index, e)}
// //                   className="bg-secLightBg"
// //                   InputLabelProps={{ style: { color: "inherit" } }}
// //                   InputProps={{ style: { color: "inherit" } }}
// //                   fullWidth
// //                 />
// //                 <TextField
// //                   label="Field Value"
// //                   name="value"
// //                   value={field.value}
// //                   onChange={(e) => handleFieldChange(index, e)}
// //                   className="bg-secLightBg"
// //                   InputLabelProps={{ style: { color: "inherit" } }}
// //                   InputProps={{ style: { color: "inherit" } }}
// //                   fullWidth
// //                 />
// //                 <Button
// //                   onClick={() => handleRemoveField(index)}
// //                   className="text-primary hover:text-darkPrimary"
// //                 >
// //                   Remove
// //                 </Button>
// //               </div>
// //             ))}
// //             <Button onClick={handleAddField} className="text-primary hover:text-darkPrimary">
// //               Add Field
// //             </Button>
// //           </div>

// //           <TextField
// //             margin="dense"
// //             label="Details"
// //             type="text"
// //             fullWidth
// //             value={selectedRoute.details}
// //             onChange={(e) =>
// //               setSelectedRoute({ ...selectedRoute, details: e.target.value })
// //             }
// //             className="bg-secLightBg"
// //             InputLabelProps={{ style: { color: "inherit" } }}
// //             InputProps={{ style: { color: "inherit" } }}
// //           />
// //         </DialogContent>
// //         <DialogActions className="bg-secLightBg">
// //           <Button
// //             onClick={handleClose}
// //             className="text-primary hover:text-darkPrimary"
// //           >
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={handleCreateOrUpdate}
// //             className="text-primary hover:text-darkPrimary"
// //           >
// //             {dialogType === "create" ? "Create" : "Update"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //       <ImageModal
// //         open={modalOpen}
// //         onClose={() => setModalOpen(false)}
// //         imgSrc={selectedImage}
// //       />
// //     </>
// //   );
// // };

// // export default CreateRoute;

// import { useEffect, useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";
// import axios from "axios";
// import Slider from "react-slick";
// import { error_toast ,sucess_toast } from "@/utils/toastNotification";
// import ImageModal from "@/components/ImageModal"; 
// import { useStateContext } from "@/contexts/ContextProvider";
// import LoadingScreen from "@/utils/loadingScreen";
// const CreateRoute = (routeId) => {

//   const { isLoading ,setIsLoading , showNew , setShowNew } = useStateContext();
//   const [routes, setRoutes] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");

//   const [dataFields, setDataFields] = useState(
//      [{ key: "", value: "" }]
//   );

//   const [selectedRoute, setSelectedRoute] = useState({
//     parrentPath:"",
//     title:"",
//     path: "",
//     view: "",
//     image: "",
//     details: "",
//     data : {},
//   });

  

//   const fetchRoutes = async () => {
//     try {
    
//       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/route`);
//       setRoutes(data);
      
//       if(routeId) {
//         const dataWithId = await axios.get(`${import.meta.env.VITE_API_URL}/route/${routeId.routeId}`);
//         setSelectedRoute(dataWithId.data);
//         setDataFields(Object.entries(selectedRoute.data).map(([key, value]) => ({ key, value })))
//       }
 
      

//     } catch (error) {
//       error_toast(
//         `Failed to fetch routes: ${
//           error.response ? error.response.data.message : error.message
//         }`
//       );
//       console.error(error);
 
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRoutes();
//   }, []);

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

//   const handleFieldChange = (index, event) => {
//     const { name, value } = event.target;
//     setDataFields((prevFields) => {
//       const updatedFields = [...prevFields];
//       updatedFields[index][name] = value;
  
//       const dataObject = updatedFields.reduce((obj, item) => {
//         if (item.key && item.value) {
//           obj[item.key] = item.value;
//         }
//         return obj;
//       }, {});
  
//       setSelectedRoute(prev => ({ ...prev, data: dataObject }));
//       return updatedFields;
//     });
//   };
  
//   const handleAddField = () => {
//     setDataFields([...dataFields, { key: "", value: "" }]);
//   };

//   const handleRemoveField = (index) => {
//     setDataFields((prevFields) => {
//       const updatedFields = prevFields.filter((_, i) => i !== index);
      
//       const dataObject = updatedFields.reduce((obj, item) => {
//         if (item.key && item.value) {
//           obj[item.key] = item.value;
//         }
//         return obj;
//       }, {});
  
//       setSelectedRoute(prev => ({ ...prev, data: dataObject }));
//       return updatedFields;
//     });
//   };


  
// const handleCreateRoute = async () => {
//   try {
     
//     const dataParrent = await axios.get(`${import.meta.env.VITE_API_URL}/route/${selectedRoute.parrentPath}`);
    
//     const dataRoute = {...selectedRoute , path: `${dataParrent.data.path}${selectedRoute.path}`}

//     await axios.post(`${import.meta.env.VITE_API_URL}/route`,dataRoute);

//     sucess_toast("Route created successfully");

//     setSelectedRoute({});
//     setShowNew(false);
    
//   } catch (error) {
//     error_toast(
//       `Failed to create route: ${
//         error.response ? error.response.data.message : error.message
//       }`
//     );
//     console.error(error);
//   }
// };

// const handleUpdateRoute = async () => {
//   try {

//     await axios.patch(
//       `${import.meta.env.VITE_API_URL}/route/${selectedRoute._id}`,
//       selectedRoute
//     );

//     sucess_toast("Route updated successfully");

  
//     setSelectedRoute({});
//     setShowNew(false);

//   } catch (error) {
//     error_toast(
//       `Failed to create route: ${
//         error.response ? error.response.data.message : error.message
//       }`
//     );
//     console.error(error);
//   }
// };
 
// const closeDialog = () => {
//   setSelectedRoute({});
//   setShowNew(false);
// }

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//   };

//   return (
//     <>
//     {isLoading && <LoadingScreen />}
//       <Dialog
//         open={showNew}
//         onClose={closeDialog}
//         maxWidth="md"
//         sx={{ "& .MuiDialog-paper": { width: "80%", overflowX: "hidden" } }}
//       >
//         <DialogTitle className="bg-secLightBg text-textLightColor">
          
//           {routeId.routeId ? "Update Route" : "Create Route"}
//         </DialogTitle>
//         <DialogContent className="bg-secLightBg" sx={{ overflowY: "scroll" }}>
//           <Select
//             id="route-select"
//             label="Parent Path"
//             value={selectedRoute?.parrentPath || "66ba0fcdb5bc1c6f0bd6f6fa"}
//             onChange={(e) =>
//               setSelectedRoute({
//                 ...selectedRoute,
//                 parrentPath: e.target.value,
//               })
//             }
//             placeholder="Parent Path"
//             fullWidth
//             className="bg-secLightBg w-full"
//             inputlabelprops={{ style: { color: "inherit" } }}
//             inputprops={{ style: { color: "inherit" } }}
//           >
//             {routes.map((route) => (
//               <MenuItem key={route._id} value={route._id}>
//                 {route.path}
//               </MenuItem>
//             ))}
//           </Select>

//           <TextField
//             autoFocus
//             margin="dense"
//             label="Title"
//             type="text"
//             fullWidth
//             value={selectedRoute.title}
//             onChange={(e) =>
//               setSelectedRoute({ ...selectedRoute, title: e.target.value })
//             }
//             className="bg-secLightBg"
//             inputlabelprops={{ style: { color: "inherit" } }}
//             inputprops={{ style: { color: "inherit" } }}
//           />
//           <TextField
//             margin="dense"
//             label="Path"
//             type="text"
//             fullWidth
//             value={selectedRoute.path || "/"}
//             onChange={(e) =>
//               setSelectedRoute({ ...selectedRoute, path: e.target.value })
//             }
//             className="bg-secLightBg"
//             inputlabelprops={{ style: { color: "inherit" } }}
//             inputprops={{ style: { color: "inherit" } }}
//           />
//           <div className="m-4">
//             <Slider {...settings}>
//               {viewOptions.map((option) => (
//                 <div
//                   key={option.name}
//                   onClick={() =>
//                     handleViewSelection(option.name)
//                   }
//                   className={`cursor-pointer p-2 rounded-lg border-2 ${
//                     selectedRoute.view === option.name
//                       ? "border-primary shadow-lg"
//                       : "border-transparent"
//                   }`}
//                 >
//                   <img
//                     src={option.imgSrc}
//                     alt={option.name}
//                     className="w-full h-32 object-cover rounded-lg"
//                     onClick={() => handleImageClick(option.imgSrc)}
//                   />
//                   <p className="text-center mt-2">{option.name}</p>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//           {/* File Input for Image Selection */}
//           <input
//             accept="image/*"
//             id="contained-button-file"
//             type="file"
//             onChange={handleImageUpload}
//             className="mb-4 bg-secLightBg text-textLightColor"
//           />
//           {/* Display the image preview */}
//           {selectedRoute.image && (
//             <div className="mb-4">
//               <p className="text-textLightColor">Selected Image Preview:</p>
//               <img
//                 src={getImageSrc(selectedRoute.image)}
//                 alt="Image Preview"
//                 className="h-32 object-cover rounded-lg mt-2"
//               />
//             </div>
//           )}
//           <TextField
//             margin="dense"
//             label="Details"
//             type="text"
//             fullWidth
//             value={selectedRoute.details}
//             onChange={(e) =>
//               setSelectedRoute({ ...selectedRoute, details: e.target.value })
//             }
//             className="bg-secLightBg"
//             inputlabelprops={{ style: { color: "inherit" } }}
//             inputprops={{ style: { color: "inherit" } }}
//           />

//           {/* data fields */}

//           <div className="my-4">
//             <h4 className="text-textLightColor mb-2">Data Fields</h4>
//             {dataFields.map((field, index) => (
//               <div key={index} className="flex items-center gap-2 mb-2">
//                 <TextField
//                   label="Field Name"
//                   name="key"
//                   value={field.key}
//                   onChange={(e) => handleFieldChange(index, e)}
//                   className="bg-secLightBg"
//                   InputLabelProps={{ style: { color: "inherit" } }}
//                   InputProps={{ style: { color: "inherit" } }}
//                   fullWidth
//                 />
//                 <TextField
//                   label="Field Value"
//                   name="value"
//                   value={field.value}
//                   onChange={(e) => handleFieldChange(index, e)}
//                   className="bg-secLightBg"
//                   InputLabelProps={{ style: { color: "inherit" } }}
//                   InputProps={{ style: { color: "inherit" } }}
//                   fullWidth
//                 />
//                 <Button
//                   onClick={() => handleRemoveField(index)}
//                   className="text-primary hover:text-darkPrimary"
//                 >
//                   Remove
//                 </Button>
//               </div>
//             ))}
//             <Button onClick={handleAddField} className="text-primary hover:text-darkPrimary">
//               Add Field
//             </Button>
//           </div>
//         </DialogContent>
//         <DialogActions className="bg-secLightBg">
//           <Button onClick={() => closeDialog()} color="primary">
//             Cancel
//           </Button>
//           {routeId.routeId ? (
//           <Button onClick={handleUpdateRoute} color="primary">
//             Update
//           </Button>
            
//           ) : (<Button onClick={handleCreateRoute} color="primary">
//             Create
//            </Button>)}          
//         </DialogActions>
//       </Dialog>

//       {/* Image Modal */}
//       {modalOpen && (
//         <ImageModal
//           open={modalOpen}
//           onClose={() => setModalOpen(false)}
//           imgSrc={selectedImage}
//         />
//       )}
//     </>
//   );
// };

// export default CreateRoute;

