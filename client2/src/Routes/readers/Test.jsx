import { useEffect, useState } from 'react';

const Test = () => {
  const [selectedWindow, setSelectedWindow] = useState({
    Hateur: "",
    Largeur: "",
    Prix: "",
    Quantite: "",
    TotalPrix: "",
    InitalPrix: "200",
  });

  const handleInputChange = (e, field) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
    setSelectedWindow({ ...selectedWindow, [field]: value });
  };

  const resetFields = () => {
    setSelectedWindow({
      Hateur: "",
      Largeur: "",
      Prix: "",
      Quantite: "",
      TotalPrix: "",
      InitalPrix: "2000",
    });
  };

  useEffect(() => {
    const calculeTotal = () => {
      const { Hateur, Largeur, Quantite, InitalPrix } = selectedWindow;
      const Prix = (((Number(Hateur) + Number(Largeur)) * 2) * Number(InitalPrix));
      setSelectedWindow({ ...selectedWindow, Prix: (Prix/1000).toFixed(2) });
      
      if (Number(Quantite) > 0) {
        const TotalPrix = Prix * Number(Quantite);
        setSelectedWindow({ ...selectedWindow, TotalPrix: (TotalPrix/1000).toFixed(2) });
      }
    };

    calculeTotal();
  }, [selectedWindow.Hateur, selectedWindow.Largeur, selectedWindow.Quantite]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 shadow-xl flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 px-11 py-9 rounded-2xl shadow-lg dark:shadow-white w-full max-w-lg">
        <h2 className="text-xl font-semibold dark:text-white mb-4 text-center">
          Window Pricing
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="w-1/2 pr-2">
              <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Hateur (mm)</label>
              <input
                type="number"
                value={selectedWindow.Hateur}
                onChange={(e) => handleInputChange(e, 'Hateur')}
                className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
                min="0"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Largeur (mm)</label>
              <input
                type="number"
                value={selectedWindow.Largeur}
                onChange={(e) => handleInputChange(e, 'Largeur')}
                className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
                min="0"
              />
            </div>
          </div>
          <div>
            <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Prix Par Unité (dn)</label>
            <p className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white bg-gray-100  text-right">
              {selectedWindow.Prix ? `${selectedWindow.Prix} da` : "0 dn"}
            </p>
          </div>
          <div>
            <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Quantité</label>
            <input
              type="number"
              value={selectedWindow.Quantite}
              onChange={(e) => handleInputChange(e, 'Quantite')}
              className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white"
              min="0"
            />
          </div>
          <div>
            <label className="py-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Prix Total (dn)</label>
            <p className="px-3 py-3 mt-1 block w-full border-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:text-white bg-gray-100 dark:bg-gray-900 text-right font-bold text-lg">
              {selectedWindow.TotalPrix ? `${selectedWindow.TotalPrix} dn` : "0 dn"}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={resetFields}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-md shadow-md"
          >
            Reset
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
