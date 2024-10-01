import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelReader = ({ route }) => {
    const [data, setData] = useState([]);

    // const ExcelUrl = `${import.meta.env.VITE_PUBLIC_URLFILE}/file_example_XLS_100.xls`;
    const ExcelUrl = `${import.meta.env.VITE_PUBLIC_URLFILE}/${route.file}`;

    const fetchAndParseExcel = async () => {
        try {
            const response = await fetch(ExcelUrl);
            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching or parsing the Excel file:', error);
        }
    };

    useEffect(() => {
        fetchAndParseExcel();
    }, [ExcelUrl]);

    return (
        <div className="min-h-screen p-4 sm:p-11">
            <h2 className="text-xl sm:text-2xl font-bold my-4 sm:my-7">Excel File Reader</h2>

            {data?.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((key, index) => (
                                    <th key={index} className="border px-1 sm:px-2 py-1 text-xs sm:text-sm">
                                        {key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((value, colIndex) => (
                                        <td key={colIndex} className="border px-1 sm:px-2 py-1 text-xs sm:text-sm">
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-sm sm:text-base">No data available. Fetching the Excel file...</p>
            )}
        </div>
    );
};

export default ExcelReader;
