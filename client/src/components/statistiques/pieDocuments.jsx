import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import useFetchData from '@/hooks/useFetchData';

const PieDocuments = () => {
    const { data, loading, error } = useFetchData(`${import.meta.env.VITE_API_URL}/route/files`);
    const [pieData, setPieData] = useState({ data: [] });

    useEffect(() => {
        if (data && data.length > 0) {
            // Organize and count data by type
            const PdfCount = data.filter((d) => d.view === 'PdfReader').length;
            const ExcelCount = data.filter((d) => d.view === 'ExcelReader').length;
            const WordCount = data.filter((d) => d.view === 'WordReader').length;

            // Update pieData with the counts and colors
            setPieData({
                data: [
                    { label: 'PDF', value: PdfCount, color: '#CB0100' }, // Red for PDFs
                    { label: 'Excel', value: ExcelCount, color: '#008525' }, // Green for Excel
                    { label: 'Word', value: WordCount, color: '#366EC2' }, // Blue for Word
                ],
            });
        }
    }, [data]);

   

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const size = {
        width: 500,
        height: 300,
    };
   

    return (
        <div className="m-5 shadow-2xl bg-lightCyen dark:shadow-white rounded-lg dark:bg-mainDarkBg flex justify-around items-center flex-wrap gap-4 p-5 ">
            <div   style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
        <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Information sur les document</h2>
       
      </div>

        <PieChart
            series={[
                {
                    arcLabel: (item) => `${item.value}`,
                    arcLabelMinAngle: 20,
                    arcLabelRadius: '70%',
                    innerRadius: '50%', // Optional: To create a donut chart
                        
                        ...pieData,
                    },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fontSize: '14px',
                    fontWeight: 'medium',
                    fill: '#FFFFFF', // Set all labels to white
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Add 
                },
            }}
            {...size}
            />
            </div>
        </div>
        
    );
};

export default PieDocuments;
