import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ImageModal = ({ open, onClose, imgSrc }) => {
 
  console.log("hello it me ",imgSrc)
  return (
    <>
<div className="fixed  inset-0 bg-black bg-opacity-50 z-50">
  <div className="bg-[#0000003f] h-full w-full flex justify-center items-center">
<IconButton
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: "absolute", top: 10, right: 10 ,zIndex:60}}
          >
          <CloseIcon />
        </IconButton>
<img
          src={imgSrc}
          alt="Enlarged"
          style={{ width: "90%", height: "90%" }}
          className="object-contain"
          />

  </div>
</div>
    <Dialog open={open} onClose={onClose} fullScreen >
      <DialogContent >
        
        
      </DialogContent>
    </Dialog>

          </>
  );
};

export default ImageModal;

{/* <Dialog open={open} onClose={onClose} fullScreen >
      <DialogContent className="bg-[#0000003f] flex justify-center items-center">
        <IconButton
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <img
          src={imgSrc}
          alt="Enlarged"
          style={{ width: "90%", height: "auto" }}
        />
      </DialogContent>
    </Dialog> */}
