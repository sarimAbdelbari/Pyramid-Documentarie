import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelReader = ({ route }) => {
    const [data, setData] = useState([]);

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
        <div className="min-h-screen p-5">
            <h2 className="text-2xl font-bold mb-4">Excel File Reader</h2>

            {data?.length > 0 ? (
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key, index) => (
                                <th key={index} className="border px-4 py-2">{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(row).map((value, colIndex) => (
                                    <td key={colIndex} className="border px-4 py-2">{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available. Fetching the Excel file...</p>
            )}
        </div>
    );
};

export default ExcelReader;
