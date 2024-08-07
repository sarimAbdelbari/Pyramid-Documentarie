import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

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

  { field: 'id', headerName: 'ID',flex:1 },
  { field: 'Domaine', headerName: 'Domaine',flex:1 },
  { field: 'NatureDuTexte', headerName: 'NatureDuTexte',flex:1 },
  { field: 'Numéro', headerName: 'Numéro',flex:1 },
  { field: 'Date', headerName: 'Date',flex:1 },
  { field: 'Contenu', headerName: 'Contenu', flex:3 , minWidth: 300 },
];

export default function TableView() {
  // Group rows by 'col1' and keep unique rows
  const groupedRows = React.useMemo(() => {
    const groups = rows.reduce((acc, row) => {
      if (!acc[row.col1]) {
        acc[row.col1] = [];
      }
      acc[row.col1].push({ ...row, id: `${row.col1}-${row.id}` }); // Modify ID to keep unique
      return acc;
    }, {});

    // Flatten the grouped rows
    return Object.values(groups).flat();              
  }, [rows]);

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={groupedRows}
        columns={columns}
      />
    </div>
  );
}
