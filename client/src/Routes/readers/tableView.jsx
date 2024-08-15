import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { error_toast } from '../../utils/toastNotification';

const TableView = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [columnsUi, setColumnsUi] = useState([]);

  const fetchData = async () => {
    try{
      setIsLoading(true);
      const col = Object.keys(route.data).map((key) => {
        return { field: key, headerName: key, minWidth: 150, flex: 1 };
      });
  
      setColumnsUi(col);

    } catch (error) {
      setIsLoading(false)
      console.error(error);
      error_toast("fetching data Error" , error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route]);

  // Sample data
  const rows = [
    { id: 1, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi', Numéro: 'N° 18-07', Date: '10/06/2018', Contenu: 'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.' },
    { id: 2, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi', Numéro: 'N° 18-07', Date: '10/06/2018', Contenu: 'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.' },
    { id: 3, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi', Numéro: 'N° 18-07', Date: '10/06/2018', Contenu: 'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.' },
    { id: 4, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi', Numéro: 'N° 18-07', Date: '10/06/2018', Contenu: 'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.' },
    { id: 5, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi', Numéro: 'N° 18-07', Date: '10/06/2018', Contenu: 'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.' },
    { id: 6, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi', Numéro: 'N° 18-07', Date: '10/06/2018', Contenu: 'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.' },
    { id: 7, Domaine: 'Protection des données à caractère personnel', NatureDuTexte: 'Loi', Numéro: 'N° 18-07', Date: '10/06/2018', Contenu: 'Relative à la protection des personnes physiques dans le traitement des données à caractère personnel.' },
  ];

  return (
    <>
      <div className="py-28">
        <div className="text-center mt-11 flex justify-center flex-col gap-7 items-center">
          <h1 className="text-xl lg:text-3xl text-textLightColor dark:text-textDarkColor font-semibold leading-relaxed">
            {route.title}
          </h1>
          <p className="text-md lg:text-xl text-textLightColor dark:text-textDarkColor font-medium w-3/5 leading-relaxed">
            {route.details}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div style={{ height: 800, width: '80%' }}>
          <DataGrid
            rows={rows}
            columns={columnsUi} // Use the dynamic columns here
            autoHeight
            loading={isLoading}
            disableSelectionOnClick
          />
        </div>
      </div>
    </>
  );
}

export default TableView;
