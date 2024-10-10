import { Link } from "react-router-dom"


// const getImageSrc = (src) => {
//   if (src.startsWith('http')) {
//     return src;
//   }
//   return `${import.meta.env.VITE_PUBLIC_URL1}/${src}`;
// };

const View6 = () => {
  return (
    <div className="min-h-screen pt-14  flex gap-9 flex-col">
      <div  className="flex justify-center items-center gap-7 flex-col">
        <h3 className="text-3xl text-textLightColor font-medium text-center">Certifications</h3>
        <p className="text-textSecLightColor text-xl text-center  "> Bienvenue au Système de Management Intégré </p>
      </div>
      <div className="flex  items-center gap-7 justify-around">
        <div >
          <h3 className="text-center text-textLightColor font-medium text-2xl p-7 "> SMQ </h3>
          <div className="flex gap-3 flex-col justify-center items-center">
            <img src={`${import.meta.env.VITE_PUBLIC_URL1}/SME.png`} alt="imageHolder" className="w-56"/>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Français</Link>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Anglais</Link>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Arabe</Link>
          </div>
        </div>
        <div>
          <h3 className="text-center text-textLightColor font-medium text-2xl p-7"> SMQ </h3>
          <div className="flex gap-3 flex-col justify-center items-center">
            <img src={`${import.meta.env.VITE_PUBLIC_URL1}/SME.png`} alt="imageHolder" className="w-56"/>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Français</Link>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Anglais</Link>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Arabe</Link>
          </div>
        </div>
        <div>
          <h3 className="text-center text-textLightColor font-medium text-2xl p-7"> SMQ </h3>
          <div className="flex gap-3 flex-col justify-center items-center">
            <img src={`${import.meta.env.VITE_PUBLIC_URL1}/SME.png`} alt="imageHolder" className="w-56"/>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Français</Link>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Anglais</Link>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Arabe</Link>
          </div>
        </div>
        <div>
          <h3 className="text-center text-textLightColor font-medium text-2xl p-7"> SMQ </h3>
          <div className="flex gap-3 flex-col justify-center items-center">
            <img src={`${import.meta.env.VITE_PUBLIC_URL1}/TEDJ.png`} alt="imageHolder" className="w-56"/>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Français</Link>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Anglais</Link>
            <Link className="text-primary hover:text-darkPrimary transition-colors duration-300 text-xl">Arabe</Link>
          </div>
        </div>
      

      </div>

    </div>
  )
}

export default View6