import { IoCloseCircleOutline } from "react-icons/io5";

const ImageModal = ({ onClose, imgSrc }) => {
 
  return (
    <>
    <></>
<div className="fixed  inset-0 bg-gray-600 bg-opacity-50 z-50">
  
  <div className="h-full w-full flex justify-center items-center relative">

          <IoCloseCircleOutline  onClick={onClose}
          className="font-bold text-3xl text-white z-50 top-5 right-5 absolute cursor-pointer hover:text-primary"/>

   
<img
          src={imgSrc}
          alt="Enlarged"
          style={{ width: "90%", height: "90%" }}
          className="object-contain"
          />

  </div>
</div>
    
          </>
  );
};

export default ImageModal;


