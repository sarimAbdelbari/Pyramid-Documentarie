import { useEffect, useState } from "react";
import { renderAsync } from "docx-preview";
import Button from "@/components/button";
import { FaFileDownload } from "react-icons/fa";

const WordReader = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const wordUrl = `${import.meta.env.VITE_PUBLIC_URLFILE}/${route.file}`;

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error state

    // Fetch the Word file and render it using docx-preview
    fetch(wordUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const container = document.getElementById("docx-container");
        renderAsync(arrayBuffer, container)
          .then(() => setLoading(false)) // Set loading to false when rendering is complete
          .catch((err) => {
            console.error("Error rendering Word document:", err);
            setError("Failed to render Word document");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Error loading Word document:", err);
        setError("Error loading the document");
        setLoading(false);
      });
  }, [wordUrl]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8 dark:bg-gray-800 p-4 rounded-lg ">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
            {route.title}
          </h3>
        </div>

        {/* Download Button Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex justify-between items-center mx-4 w-full">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Téléchargez le fichier Word
          </p>
          <div onClick={() => window.open(wordUrl, "_blank")} className="cursor-pointer">
            <Button Text="Télécharger" Icon={<FaFileDownload />} />
          </div>
        </div>

        {/* Word Document Rendering Section */}
        <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg mx-4 w-full p-4 relative">
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-gray-900 z-20">
              <span className="text-white text-xl">Chargement...</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-red-600 z-20">
              <span className="text-white text-xl">{error}</span>
            </div>
          )}

          <div
            id="docx-container"
            className="word-content text-gray-900 dark:text-gray-200 bg-secLightBg dark:bg-gray-900 p-4 rounded-md"
          >
            {/* This div will be populated with the rendered Word content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordReader;
