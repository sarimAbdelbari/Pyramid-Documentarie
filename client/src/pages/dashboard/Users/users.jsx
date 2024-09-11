import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import SideBar from '@/components/sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useStateContext } from '@/contexts/ContextProvider';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { sucess_toast, error_toast } from '@/utils/toastNotification';
import Select from 'react-select';


const Users = () => {
  const { isLoading } = useStateContext();
  const [usersData, setUsersData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedUser, setSelectedUser] = useState({ userName: '', email: '', password: '', groop: '' });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState([]);
 const [groopList,setGroopList] = useState([]);


  // const groopOptions = [
  //   { value: 'Administrator', label: 'Admin' },
  //   { value: 'User', label: 'User' },
  //   { value: 'editor', label: 'Editor' },
  //   { value: 'viewer', label: 'Viewer' },
  //   { value: 'Devaloper', label: 'Devaloper' },
  // ];

  const groopOptions = groopList.map((groop) => ({
    value: groop._id,
    label: groop.groopName,
  }));
  

  useEffect(() => {
    fetchUsers();
    const savedVisibilityModel = localStorage.getItem('columnVisibilityModelUsers');
    if (savedVisibilityModel) {
      setColumnVisibilityModel(JSON.parse(savedVisibilityModel));
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: usersData } = await axios.get('http://localhost:5000/api/users');
      const { data: groopData } = await axios.get('http://localhost:5000/api/groop');
  
        //  console.log("groopData ::" ,groopData)

      setGroopList(groopData); // Populate group list
  
      // Update users with unique ID
      const dataWithId = usersData.map((user, index) => ({ ...user, id: index + 1 }));
      setUsersData(dataWithId);
    } catch (error) {
      error_toast('Impossible de récupérer les utilisateurs');
      console.error(error);
    }
  };
  
  const handleCreateUser = async () => {
    try {
      const { data } = await axios.post(`http://localhost:5000/api/users`, selectedUser);
      sucess_toast('Utilisateur créé avec succès');
      // setUsersData(prevState => [...prevState, { ...data, id: prevState.length + 1 }]);
      handleCloseDialog();
    } catch (error) {
      error_toast("Échec de la création de l'utilisateur");
      console.error(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      
      // console.log("selectedUser" ,selectedUser)

      const { data } = await axios.patch(`http://localhost:5000/api/users/${selectedUser._id}`, selectedUser);
      sucess_toast("Mise à jour de l'utilisateur réussie");
      setUsersData(prevState => prevState.map(user => (user._id === data._id ? { ...data, id: user.id } : user)));
      handleCloseDialog();
    } catch (error) {
      error_toast("Échec de la mise à jour de l'utilisateur");
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userToDelete._id}`);
      sucess_toast("L'utilisateur a été supprimé avec succès");
      setUsersData(prevState => prevState.filter(user => user._id !== userToDelete._id));
      handleCloseConfirmDialog();
    } catch (error) {
      error_toast("Impossible de supprimer l'utilisateur");
      console.error(error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'userName', headerName: "Nom d'utilisateur", flex: 2 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'groop',
      headerName: 'Group',
      flex: 2,
      renderCell: (params) => {
        const groopLabels = (params.row.groop || [])
          .map(groopId => groopOptions.find(option => option.value === groopId)?.label)
          .filter(label => label);  // Filter out undefined labels, if any
        return groopLabels.map((groopLabels, index) => (
          <span key={index} className='bg-primary p-2 mx-2 text-white rounded-xl'>{groopLabels ? groopLabels: 'No Group'}</span>
        ))
      }
    }
    
    ,
    
    { field: 'createdAt', headerName: 'Créé à', flex: 1 },
    { field: 'updatedAt', headerName: 'Mis à jour à', flex: 1 },
    {
      field: 'actions', headerName: 'Actions', flex: 1, renderCell: (params) => (
        <>
          <IconButton 
            onClick={() => handleOpenDialog('update', params.row)}
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
      )
    }
  ];

  const handleOpenDialog = (type, user = { userName: '', email: '', password: '', groop: '' }) => {
    setDialogType(type);
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser({ userName: '', email: '', password: '', groop: '' });
  };

  const handleOpenConfirmDialog = (user) => {
    setUserToDelete(user);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleColumnVisibilityChange = (newModel) => {
    setColumnVisibilityModel(newModel);
    localStorage.setItem('columnVisibilityModelUsers', JSON.stringify(newModel));
  };
  
  const onSelectGroop =(selectedOptions) => {
    const selectedGroopIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedUser({ ...selectedUser, groop: selectedGroopIds });
  }

  return  (
    <div className='min-h-screen bg-mainLightBg dark:bg-mainDarkBg text-textLightColor '>
      <Navbar />
      <SideBar />
      <div className='pt-32 flex flex-col items-center gap-7'>
        <h3 className='text-3xl font-semibold text-textLightColor  dark:text-textDarkColor leading-relaxed'>Utilisateurs</h3>
        <Button 
          variant="contained" 
          className='bg-primary hover:bg-darkPrimary text-white shadow-lg rounded-xl'
          startIcon={<AddIcon />} 
          onClick={() => handleOpenDialog('create')}
        >
          Créer un utilisateur
        </Button>
        <div className='w-full max-w-7xl  shadow-2xl rounded-lg' style={{ height: '600px' }}>
          <DataGrid
            rows={usersData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            checkboxSelection={false}
            loading={isLoading} 
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleColumnVisibilityChange}
            className='m-4  border-none bg-[#f9fafb] text-textLightColor '
            sx={{
              // Row background color
              '& .MuiDataGrid-row': {
                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#f9fafb',
                '&:nth-of-type(even)': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#111827' : '#e5e7eb',
                },
                '&:hover:nth-of-type(even)': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2d3748' : '#e2e8f0', // Customize hover color here
                },
                // Row hover color
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2d3748' : '#e2e8f0', // Customize hover color here
                },
              },
              // Row text color
              '& .MuiDataGrid-cell': {
                color: (theme) => theme.palette.mode === 'dark' ? '#e5e7eb' : '#1f2937', // Customize text color here
              },
            }}
          />
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}  maxWidth="lg"
        sx={{ "& .MuiDialog-paper": { height: "65%", overflowX: "hidden"} }}>
        <DialogTitle>{dialogType === 'create' ? 'Créer un utilisateur' : "Mettre à jour l'utilisateur" }</DialogTitle>
        <DialogContent >
          <TextField
            label="Nom d'utilisateur"
            value={selectedUser.userName}
            onChange={(e) => setSelectedUser({ ...selectedUser, userName: e.target.value })}
            fullWidth
            margin="normal"
            className="text-primary"
          />
          <TextField
            label="Email"
            value={selectedUser.email}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="mot de passe"
            type="password"
            value={selectedUser.password}
            onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="group"
            value={selectedUser.groop}
            onChange={(e) => setSelectedUser({ ...selectedUser, groop: e.target.value })}
            fullWidth
            margin="normal"
          /> */}
          <Select
            isMulti
            value={groopOptions.filter(option => selectedUser.groop.includes(option.value))}
            onChange={(selectedOptions) => onSelectGroop(selectedOptions)}
            options={groopOptions}
            placeholder="Sélectionner un ou plusieurs rôles"
            className="mt-4"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
          Annuler
          </Button>
          <Button 
            onClick={dialogType === 'create' ? handleCreateUser : handleUpdateUser} 
            color="primary"
          >
            {dialogType === 'create' ? 'Créer' : 'Mise à jour'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
        Etes-vous sûr de vouloir supprimer {userToDelete?.userName}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
          Annuler
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
          Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;