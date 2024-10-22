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

  return (

    <div className="absolute top-0 left-0 w-full h-screen bg-secLightBg bg-opacity-65 flex justify-center items-center p-9" style={{zIndex: 100}}>
        <IoCloseCircleOutline
            onClick={() => setShowLivePreview(false)}
            className="font-bold text-3xl text-darkPrimary z-50 top-3 right-3 absolute cursor-pointer hover:text-white hover:scale-125 duration-300"
        />
     <div className="bg-white shadow-2xl rounded-2xl w-full h-full overflow-y-auto relative p-3 "> 
      <div className="pointer-events-none">

      <Navbar/>
     {selectedNode?.routeId?.view === "View1" && <View1 route={selectedNode?.routeId} preview={preview} />}
     {selectedNode?.routeId?.view === "View2" && <View2 route={selectedNode?.routeId} preview={preview} />}
     {selectedNode?.routeId?.view === "View3" && <View3 route={selectedNode?.routeId} preview={preview} />}
     {selectedNode?.routeId?.view === "View4" && <View4 route={selectedNode?.routeId} preview={preview} />}
     {selectedNode?.routeId?.view === "View5" && <View5 route={selectedNode?.routeId} preview={preview} />}
     {selectedNode?.routeId?.view === "TableView" && <TableView route={selectedNode?.routeId} preview={preview} />}
     {selectedNode?.routeId?.view === "PdfReader" && <PdfReader route={selectedNode?.routeId} preview={preview} />}
     {selectedNode?.routeId?.view === "ExcelReader" && <ExcelReader route={selectedNode?.routeId} preview={preview} />}
     {selectedNode?.routeId?.view === "WordReader" && <WordReader route={selectedNode?.routeId} preview={preview} />}
      </div>
     </div>
    </div>
  )
}

export default LivePreview;