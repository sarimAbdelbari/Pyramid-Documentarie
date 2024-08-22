import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfReader = (route) => {
  // const pdfUrl = 'https://pdfobject.com/pdf/sample.pdf'; // Replace with your PDF file path
  // const pdfUrl =   `VITE_PUBLIC_URLFILE route.route.file`; 
  const pdfUrl =   `${import.meta.env.VITE_PUBLIC_URLFILE}/${route.route.file}`; 

  console.log(route);
  return (
    <div className="min-h-screen">
      <div className="py-32">
        <div className="w-full max-w-7xl p-12 bg-white  rounded-lg mx-auto">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl} defaultScale={1.5} />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default PdfReader;
