import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useStateContext } from '@/contexts/ContextProvider';
import { FcExpired, FcDocument } from 'react-icons/fc';

const TableView = ({ route, preview }) => {
  const [columnsUi, setColumnsUi] = useState([]);
  const [rowsUi, setRowsUi] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
  const { routeData } = useStateContext();

  // Fetch data and set up columns and rows
  const fetchData = async () => {
    try {
      // Define columns dynamically based on tableCol data
      const col = Object.keys(route.data.tableCol).map((field) => ({
        field,
        headerName: field,
        minWidth: 150,
        flex: 1,
      }));

      // Add the File column with custom rendering
      col.push({
        field: 'file',
        headerName: 'Fichiers',
        minWidth: 150,
        flex: 1,
        renderCell: (params) => (
          <Link
            to={`${params.value.path}`}
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-start pl-4 pr-12 h-14 overflow-hidden font-semibold text-primary transition-all duration-400 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
          >
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-primary group-hover:h-full"></span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
              {params.value.title}
            </span>
          </Link>
        ),
      });

      // Add the Expiration Date column with custom rendering
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
            <div className="flex justify-center items-center py-2 h-full">
              {status === 'expired' ? (
                <FcExpired className="text-3xl" />
              ) : (
                <FcDocument className="text-3xl" />
              )}
            </div>
          );
        },
      });

      setColumnsUi(col);

      // Fetch rows
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/route/parrentId/${route._id}`
      );

      if (response.data.length > 0) {
        const rows = preview
          ? response.data.map((row, index) => ({
              id: index,
              file: row,
              expiredate: row.expiredate,
              ...row.data.tableRow.reduce((acc, current) => ({ ...acc, ...current }), {}),
            }))
          : response.data
              .map((item) => routeData.find((r) => r._id === item._id))
              .filter(Boolean)
              .map((row, index) => ({
                id: index,
                file: row,
                expiredate: row.expiredate,
                ...row.data.tableRow.reduce((acc, current) => ({ ...acc, ...current }), {}),
              }));

        setRowsUi(rows);
      }
    } catch (error) {
      console.error('Fetching data error:', error);
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
      <div className="py-8">
        <div className="text-center flex flex-col gap-4 items-center">
          <h1 className="text-xl lg:text-3xl font-semibold text-textLightColor dark:text-textDarkColor">
            {route.title}
          </h1>
          <p className="text-md lg:text-lg text-textSecLightColor dark:text-textSecDarkColor w-3/5">
            {route.details}
          </p>
        </div>
      </div>
      <div className="flex justify-center my-8">
        <div style={{ height: 800, width: '90%' }}>
          <DataGrid
            rows={rowsUi}
            columns={columnsUi}
            autoHeight
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={handleColumnVisibilityChange}
            rowHeight={80}
            disableSelectionOnClick
            className="bg-mainLightBg dark:bg-secDarkBg text-textLightColor dark:text-textDarkColor"
          />
        </div>
      </div>
    </>
  );
};

export default TableView;
