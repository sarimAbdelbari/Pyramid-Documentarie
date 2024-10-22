import { useEffect } from "react";
import { renderAsync } from "docx-preview";
import Button from "@/components/button";
import { FaFileDownload } from "react-icons/fa";

const WordReader = ({route}) => {
  const wordUrl = `${import.meta.env.VITE_PUBLIC_URLFILE}/${route.file}`;


  useEffect(() => {
    // Fetch the Word file and render it using docx-preview
    fetch(wordUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const container = document.getElementById("docx-container");
        renderAsync(arrayBuffer, container); // Render DOCX into the div
      })
      .catch((err) => {
        console.error("Error loading Word document:", err);
      });
  }, [wordUrl]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-12">
      <div className="">
        <div className="text-center mb-8 dark:bg-gray-800 p-4 rounded-lg shadow-md ">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
             {route.title}
          </h3>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex justify-between items-center  w-full">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Téléchargez le fichier Word
          </p>
          <div onClick={() => window.open(wordUrl, '_blank')} className="cursor-pointer">
            <Button Text="Télécharger" Icon={<FaFileDownload />} />
          </div>
        </div>

        <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg  w-full p-6 relative border border-gray-200 dark:border-gray-700">
          <div
            id="docx-container"
            className="word-content text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-4 rounded-md"
          >
            {/* This div will be populated with the rendered Word content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordReader;
