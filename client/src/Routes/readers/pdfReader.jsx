
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Button from "@/components/button";
const PdfReader = ({route}) => {
  // const pdfUrl = 'https://pdfobject.com/pdf/sample.pdf'; // Replace with your PDF file path
  // const pdfUrl =   `VITE_PUBLIC_URLFILE route.route.file`; 
  const pdfUrl =   `${import.meta.env.VITE_PUBLIC_URLFILE}/${route.route.file}`; 

  console.log("pdfUrl",pdfUrl)

  console.log("Route ::::::::::::::",route);

  return (
    <div className="min-h-screen">
      <div className="py-32">
        <div className='bg-white dark:bg-mainDarkBg dark:shadow-white flex justify-end items-center py-4 px-8 shadow-lg my-8'>
          <div className="">
           <Button Text="Télécharger"/>
          </div>
        </div>
        <div className="relative px-5  max-w-7xl  py-12 bg-white mx-auto  rounded-lg shadow-lg" >
            
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js" >
          <div className='h-full w-full absolute top-0 left-0 bg-[#ffffff00] z-30'>
          </div>
            <Viewer fileUrl={pdfUrl} defaultScale={1.5} />
          </Worker>
        </div>
      </div>
    </div>
  );
};

export default PdfReader;
