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
        width: 400,
        height: 200,
    };

    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => (<>{`${item.value}`}</>),

                    // arcLabel: (item) => (
                    //     <span className='text-white font-bold'>
                    //       ${`${item.label}: ${item.value}%`}
                    //     </span>
                    //   ),

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
    );
};

export default PieDocuments;
