import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Button from "@/components/button";
import { FaFileDownload } from "react-icons/fa";
import { useState, useEffect } from 'react';

const PdfReader = ({ route }) => {
  const pdfUrl = `${import.meta.env.VITE_PUBLIC_URLFILE}/${route.file}`;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle PDF loading state
  useEffect(() => {
    setLoading(true);
    setError(null);
  }, [pdfUrl]);

  const handlePdfLoad = () => {
    setLoading(false);
  };

  const handlePdfError = () => {
    setError('Erreur lors du chargement du fichier PDF');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-8 dark:bg-gray-800 p-4 rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
            {route.title}
          </h1>
        </div>

        {/* Download Button Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex justify-between items-center mx-4 w-full">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Téléchargez le fichier PDF
          </p>
          <div onClick={() => window.open(pdfUrl, '_blank')} className="cursor-pointer">
            <Button Text="Télécharger" Icon={<FaFileDownload />} />
          </div>
        </div>

        {/* PDF Viewer Section */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-4 w-full p-4 relative">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 z-20">
              <span className="text-white text-xl">Chargement...</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-red-600 z-20">
              <span className="text-white text-xl">{error}</span>
            </div>
          )}

          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfUrl}
              defaultScale={1.5}
              onLoad={handlePdfLoad}
              onError={handlePdfError}
            />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default PdfReader;
