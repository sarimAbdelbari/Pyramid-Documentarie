import {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';


const TableView = ()=> {

const [isLoading , setIsLoading] = useState(false)

// Sample data
const rows = [
  { id: 1, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi' , Numéro:'N° 18-07' , Date:'10/06/2018' , Contenu:'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.'},
  { id: 2, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi' , Numéro:'N° 18-07' , Date:'10/06/2018' , Contenu:'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.'},
  { id: 3, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi' , Numéro:'N° 18-07' , Date:'10/06/2018' , Contenu:'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.'},
  { id: 4, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi' , Numéro:'N° 18-07' , Date:'10/06/2018' , Contenu:'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.'},
  { id: 5, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi' , Numéro:'N° 18-07' , Date:'10/06/2018' , Contenu:'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.'},
  { id: 6, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi' , Numéro:'N° 18-07' , Date:'10/06/2018' , Contenu:'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.'},
  { id: 7, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi' , Numéro:'N° 18-07' , Date:'10/06/2018' , Contenu:'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.'},
];

// Define columns
const columns = [

  { field: 'id', headerName: 'ID',width:50 },
  { field: 'Domaine', headerName: 'Domaine',flex:3 },
  { field: 'NatureDuTexte', headerName: 'NatureDuTexte',flex:2 },
  { field: 'Numéro', headerName: 'Numéro',flex:2 },
  { field: 'Date', headerName: 'Date',flex:2 },
  { field: 'Contenu', headerName: 'Contenu', flex:3 , minWidth: 300 },
];


  return (
  <>
      <div className="py-28">
       <div className="text-center my-11 flex justify-center flex-col gap-7 items-center">
          <h1 className="text-xl lg:text-3xl text-textLightColor dark:text-textDarkColor font-semibold leading-relaxed">
            {/* {route.route.title} */}
            Title
          </h1>
          <p className="text-md lg:text-xl text-textLightColor dark:text-textDarkColor font-medium w-3/5 leading-relaxed">
          {/* {route.route.details} */}
          Details on what you have to say
          </p>
        </div>
    </div>
    <div className='w-full flex justify-center items-center'>

    <div className='mt-11' style={{ height: 800, width: '80%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        
        loading={isLoading}
        disableSelectionOnClick
        disableColumnMenu
      />
    </div>
    </div>
  </>
  );
} 

 
export default TableView;
