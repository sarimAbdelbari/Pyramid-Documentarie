import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Button from "@/components/button";
import { FaFileDownload } from "react-icons/fa";

const PdfReader = ({ route }) => {
  const pdfUrl = `${import.meta.env.VITE_PUBLIC_URLFILE}/${route.file}`;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-12">
      <div className="container mx-auto">
        <div className="text-center mb-8  dark:bg-gray-800 p-4 rounded-lg">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
            {route.title}
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex justify-between items-center mx-4 w-full">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Téléchargez le fichier PDF
          </p>
          <div onClick={() => window.open(pdfUrl, '_blank')} className="cursor-pointer">
            <Button Text="Télécharger" Icon={<FaFileDownload />} />
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-4 w-full p-4 relative">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl} defaultScale={1.5} />
          </Worker>
          <div className="absolute inset-0 bg-transparent z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default PdfReader;
