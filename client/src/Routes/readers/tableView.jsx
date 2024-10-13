import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';

const TableView = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [columnsUi, setColumnsUi] = useState([]);
  const [rowsUi, setRowsUi] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
  const { routeData } = useStateContext();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Create dynamic columns based on route data
      const col = Object.keys(route.data.tableCol).map((field) => ({
        field,
        headerName: field,
        minWidth: 150,
        flex: 1,
      }));

      // Add the File column
      col.push({
        field: 'file',
        headerName: 'File',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
          <Link to={`${params.value.path}`} rel="noopener noreferrer">
            <div className="relative inline-flex min-w-40 items-center justify-start pl-4 pr-12 h-14 overflow-hidden font-semibold text-primary transition-all duration-400 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-primary group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">{params.value.title}</span>
            </div>
          </Link>
        ),
      });

      // Add the Expiration Date column
      col.push({
        field: 'expiredate',
        headerName: "État d'expiration",
        minWidth: 150,
        flex: 1,
        renderCell: (params) => {
          const expireDate = new Date(params.value);
          const now = new Date();
          const diffInHours = (now - expireDate) / (1000 * 60 * 60);
          const status = diffInHours > 24 ? 'expired' : 'new';

          return (
            <div className='flex justify-center items-center py-2'>
              <img
                src={`${import.meta.env.VITE_PUBLIC_URL1}/${status === 'expired' ? 'expired.webp' : 'new.jpg'}`}
                alt={status}
                className='w-14'
              />
            </div>
          );
        },
      });

      setColumnsUi(col);

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/route/parrentId/${route._id}`);
      if (response.data.length === 0) {
        setIsLoading(false);
        return;
      }

      const responseIds = response.data.map((item) => item._id);
      const newRoutes = routeData.filter((route) => responseIds.includes(route._id));

      const tableRows = newRoutes.map((row, index) => {
        const combinedRow = row.data.tableRow.reduce((acc, current) => ({ ...acc, ...current }), {});
        return {
          id: index,
          ...combinedRow,
          file: row,
          expiredate: row.expiredate,
        };
      });

      setRowsUi(tableRows);

    } catch (error) {
      console.error('Fetching data error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedVisibilityModel = localStorage.getItem('columnVisibilityModelTableView');
    if (savedVisibilityModel) {
      setColumnVisibilityModel(JSON.parse(savedVisibilityModel));
    }
    fetchData();
  }, [route]);

  const handleColumnVisibilityChange = (newModel) => {
    setColumnVisibilityModel(newModel);
    localStorage.setItem('columnVisibilityModelTableView', JSON.stringify(newModel));
  };

  return (
    <>
      <div className="pt-12">
        <div className="text-center mt-11 flex justify-center flex-col gap-7 items-center">
          <h1 className="text-xl lg:text-3xl text-textLightColor dark:text-textDarkColor font-semibold leading-relaxed">
            {route.title}
          </h1>
          <p className="text-md lg:text-lg text-textSecLightColor dark:text-textDarkColor font-medium w-3/5 leading-relaxed">
            {route.details}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center my-12">
        <div style={{ height: 800, width: '90%' }}>
          <DataGrid
            rows={rowsUi}
            columns={columnsUi}
            autoHeight
            loading={isLoading}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleColumnVisibilityChange}
            rowHeight={80}
            disableSelectionOnClick
          />
        </div>
      </div>
    </>
  );
};

export default TableView;
