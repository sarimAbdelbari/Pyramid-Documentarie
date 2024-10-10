import View1Edit from '../Views/View1Edit';
import View2Edit from '../Views/View2Edit';
import View3Edit from '../Views/View3Edit';
import View4Edit from '../Views/View4Edit';
import View5Edit from '../Views/View5Edit';
import View6Edit from '../Views/View6Edit';
import TableEditView from '../Views/TableEditView';
import PdfReader from '../Readers/PdfReader';
import ExcelReader from '../Readers/ExcelReader';


const AddChild = (route) => {
 
  return (

    <div className=" bg-mainLightBg dark:bg-mainDarkBg dark:shadow-white flex justify-center items-center ">
      {route?.route?.view === "View1" && <View1Edit route={route} />}
      {route?.route?.view === "View2" && <View2Edit route={route} />}
      {route?.route?.view === "View3" && <View3Edit route={route.route} />}
      {route?.route?.view === "View4" && <View4Edit route={route} />}
      {route?.route?.view === "View5" && <View5Edit route={route} />}
      {route?.route?.view === "View6" && <View6Edit route={route} />}
      {route?.route?.view === "TableView" && <TableEditView route={route} />}
      {route?.route?.view === "PdfReader" && <PdfReader route={route} />}
      {route?.route?.view === "ExcelReader" && <ExcelReader route={route} />}
        
    </div>
  )
}

export default AddChild;