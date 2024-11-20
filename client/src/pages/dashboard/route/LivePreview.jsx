import View1 from "@/Routes/views/view1";
import View4 from "@/Routes/views/view4";
import View2 from "@/Routes/views/view2";
import View3 from "@/Routes/views/view3";
import View5 from "@/Routes/views/view5";
import PdfReader from "@/Routes/readers/pdfReader";
import TableView from "@/Routes/views/tableView";
import ExcelReader from "@/Routes/readers/excelReader";
import WordReader from "@/Routes/readers/wordReader";
import { useStateContext } from "@/contexts/ContextProvider";
import { IoCloseCircleOutline } from "react-icons/io5";
import Navbar from "@/components/navbar";
const LivePreview = (selectedNode) => {

  const {setShowLivePreview} = useStateContext()
  
  const preview = true;

 // Function to render the appropriate component
 const renderView = () => {
  const view = selectedNode?.routeId?.view;
  switch (view) {
    case "View1":
      return <View1 route={selectedNode?.routeId} preview={preview} />;
    case "View2":
      return <View2 route={selectedNode?.routeId} preview={preview} />;
    case "View3":
      return <View3 route={selectedNode?.routeId} preview={preview} />;
    case "View4":
      return <View4 route={selectedNode?.routeId} preview={preview} />;
    case "View5":
      return <View5 route={selectedNode?.routeId} preview={preview} />;
    case "TableView":
      return <TableView route={selectedNode?.routeId} preview={preview} />;
    case "PdfReader":
      return <PdfReader route={selectedNode?.routeId} preview={preview} />;
    case "ExcelReader":
      return <ExcelReader route={selectedNode?.routeId} preview={preview} />;
    case "WordReader":
      return <WordReader route={selectedNode?.routeId} preview={preview} />;
    default:
      return <p>No view available</p>; // A fallback message or component
  }
};
  return (

    <div className="absolute top-0 left-0 w-full h-screen bg-secLightBg bg-opacity-65 flex justify-center items-center p-9" style={{zIndex: 100}}>
        <IoCloseCircleOutline
            onClick={() => setShowLivePreview(false)}
            className="font-bold text-3xl text-darkPrimary z-50 top-3 right-3 absolute cursor-pointer hover:text-white hover:scale-125 duration-300"
        />
     <div className="bg-white shadow-2xl rounded-2xl w-full h-full overflow-y-auto relative p-3 "> 
      <div className="pointer-events-none">

      <Navbar/>
      {renderView()}
      </div>
     </div>
    </div>
  )
}

export default LivePreview;