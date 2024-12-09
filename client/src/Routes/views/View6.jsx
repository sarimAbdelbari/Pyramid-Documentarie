import { Link } from "react-router-dom";

const getImageSrc = (src) => {
  if (src.startsWith('http')) {
    return src;
  }
  return `${import.meta.env.VITE_PUBLIC_URL1}/${src}`;
};

const View6 = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center gap-12 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="text-center flex flex-col items-center">
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">Certifications</h3>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
          Bienvenue au Système de Management Intégré
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap gap-8 justify-center">
        {/* First Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 w-64">
          <h3 className="text-center text-2xl font-medium text-gray-800 dark:text-white mb-5">SMQ</h3>
          <div className="flex flex-col items-center gap-3">
            <img
              src={getImageSrc('SME.png')}
              alt="SME"
              className="w-48 h-48 object-contain"
            />
            <div className="flex flex-col items-center gap-2">
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Français
              </Link>
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Anglais
              </Link>
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Arabe
              </Link>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 w-64">
          <h3 className="text-center text-2xl font-medium text-gray-800 dark:text-white mb-5">SMQ</h3>
          <div className="flex flex-col items-center gap-3">
            <img
              src={getImageSrc('SME.png')}
              alt="SME"
              className="w-48 h-48 object-contain"
            />
            <div className="flex flex-col items-center gap-2">
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Français
              </Link>
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Anglais
              </Link>
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Arabe
              </Link>
            </div>
          </div>
        </div>

        {/* Third Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 w-64">
          <h3 className="text-center text-2xl font-medium text-gray-800 dark:text-white mb-5">SMQ</h3>
          <div className="flex flex-col items-center gap-3">
            <img
              src={getImageSrc('SME.png')}
              alt="SME"
              className="w-48 h-48 object-contain"
            />
            <div className="flex flex-col items-center gap-2">
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Français
              </Link>
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Anglais
              </Link>
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Arabe
              </Link>
            </div>
          </div>
        </div>

        {/* Fourth Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 w-64">
          <h3 className="text-center text-2xl font-medium text-gray-800 dark:text-white mb-5">SMQ</h3>
          <div className="flex flex-col items-center gap-3">
            <img
              src={getImageSrc('TEDJ.png')}
              alt="TEDJ"
              className="w-48 h-48 object-contain"
            />
            <div className="flex flex-col items-center gap-2">
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Français
              </Link>
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Anglais
              </Link>
              <Link className="text-primary hover:text-darkPrimary transition duration-300 text-lg">
                Arabe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View6;
