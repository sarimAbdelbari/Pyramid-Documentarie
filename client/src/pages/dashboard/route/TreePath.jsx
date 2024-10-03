import { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree';
import { error_toast, sucess_toast } from '@/utils/toastNotification';
import LoadingScreen from '@/utils/loadingScreen';
import { useCenteredTree } from './helpers';
import Button from '@/components/button';
import CreateRoute from './CreateRoute';
import { useStateContext } from '@/contexts/ContextProvider';
import { RxUpdate } from "react-icons/rx";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ThemeContext } from '@/components/themeProvider';
import { AiOutlineSisternode } from "react-icons/ai";
import { viewOptions } from '../../../data/DataForm';

export default function TreePath() {

  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const { setShowNew, showNew, reloadfetch } = useStateContext();
  const [tooltip, setTooltip] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    data: {}
  });
  const [loading, setLoading] = useState(true);
  const [translate, containerRef] = useCenteredTree();
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    nodeData: null
  });
  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    nodeData: null
  });
  const [selectedNode, setSelectedNode] =  useState(null);


  // Tooltip component
  const CustomTooltip = ({ visible, position, data }) => {
  
  
    if (!visible) return null; // Early return if tooltip is not visible
  
    return (
      <div className="custom-tooltip" style={{ top: position.y, left: position.x }}>
        <p className='text-center text-xl my-3 font-medium text-black'>{data.title}</p>
        {viewOptions.map((view) => {
          if (view.name === data.view) {
            return (
              <>
                <h4 className='text-center text-xl my-3 font-medium text-black'>{view.titre}</h4>
                <img src={view.imgSrc} alt={data.title} style={{ width: '550px', height: 'auto' }} />
              </>
            );
          }
          return null;
        })}
      </div>
    );
  };
  
  



const getNodeColor = (viewType) => {
  switch (viewType) {
    case 'TableView':
      return "#0056B3"; 
    case 'PdfReader':
      return "#980100"; 
    case 'ExcelReader':
      return "#005217"; 
      default:
        return "#000020"; 
  }
};



// Node rendering with events
const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode, wrapper, setTooltip, showContextMenu, selectNode }) => {
  const y = -35;
  const x = 5;
  const tooltipData = nodeDatum.attributes || {};

  const nodeColor = getNodeColor(tooltipData.view);
  
  return (
    <g
      ref={wrapper}
      onMouseEnter={(e) => setTooltip({
        visible: true,
        position: { x: e.pageX, y: e.pageY },
        data: tooltipData,
      })}
      onMouseLeave={() => setTooltip({
        visible: false,
        position: { x: 0, y: 0 },
        data: {},
      })}
      onContextMenu={(e) => {
        e.preventDefault();
        showContextMenu(nodeDatum, e.pageX, e.pageY);
      }}
      onClick={() => selectNode(nodeDatum)}
    >
      <circle
        r="22"
        fill={nodeColor}
        onClick={toggleNode}
        style={{
          transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
          transform: 'scale(0.1)', // Start with a small scale
          opacity: 0, // Start with opacity 0
          animation: `nodeAppear 0.5s forwards ease-in-out`,
          border:'2px solid white',
        }}
      />
      <text fill={theme == "light" ? "black" : "white"} stroke="none" fontSize="18px" fontWeight={600}  x={x} y={y} >
        {nodeDatum?.path.split("/") || nodeDatum.title}
      </text>
    </g>
  );
};


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/route`)
      .then(response => {
        const transformedData = transformData(response.data);
        setData(transformedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [reloadfetch]);

  const showContextMenu = (nodeData, x, y) => {
    setContextMenu({
      visible: true,
      position: { x, y },
      nodeData
    });

  };

  const handleDeleteNode = () => {
    setConfirmModal({
      visible: true,
      nodeData: contextMenu.nodeData
    });
    setContextMenu({
      ...contextMenu,
      visible: false
    });
  };

  const selectNode = (nodeData) => {
   
    setSelectedNode(nodeData._id);

    // setShowNew(true); // Show the CreateRoute component for editing
  };

  const transformData = (routeData) => {

    const routeMap = {};
    const roots = [];

    routeData.forEach(route => {
      route.children = [];
      routeMap[route._id] = route;
    });
  
    routeData.forEach(route => {
      if (route.parrentPath) {
        const parent = routeMap[route.parrentPath];
        if (parent) {
          parent.children.push(route);
        }
      } else {
        roots.push(route);
      }
    });
    const addAttributes = (node) => {
      node.attributes = { ...node };  
      node.children.forEach(addAttributes); 
    };
  
    roots.forEach(addAttributes);  

    return roots;


};


  const confirmDeleteNode = async () => {
    const nodeToDelete = confirmModal.nodeData;
    

    if (nodeToDelete) {
      const routeId  = nodeToDelete._id;

      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/route/${routeId}`);

        
        setConfirmModal({ visible: false, nodeData: null });
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/route`);

       

        const transformedData = transformData(response.data);

        setData(transformedData);

        sucess_toast('Nœud supprimé avec succès');

      } catch (error) {
        console.error('Erreur lors de la suppression du nœud:', error);
        error_toast('Erreur lors de la suppression du nœud');
      }
    }
  };

  const AddRoute = (nodeData) => {

    setSelectedNode(nodeData?._id ||"");
    setShowNew(true);
    setContextMenu({
      ...contextMenu,
      visible: false
    });
  };

//  const AddChildRoute = (nodeData) => {
//   setSelectedNode(nodeData?._id ||"");
//   setShowNew(true);
//   setContextMenu({
//     ...contextMenu,
//     visible: false
//   });
//   }
  const ContextMenu = ({ position, onDelete, nodeData }) => (
    <div className="context-menu fixed bg-mainLightBg shadow-2xl rounded-3xl p-7 " style={{ top: position.y, left: position.x }}>
      <div className='absolute top-2 right-2 hover:opacity-70 '>
      <AiOutlineCloseCircle  className='text-xl cursor-pointer' onClick={() => setContextMenu({ ...contextMenu, visible: false })}/>

      </div>
      <ul className='flex flex-col gap-3'>
        {/* <li  className='cursor-pointer text-xl font-medium text-primary flex justify-center items-center bg-white hover:bg-secLightBg transition-colors  rounded-xl p-3 gap-3' onClick={() => AddChildRoute(nodeData)}><RxUpdate className='text-2xl' />Ajouter un Route enfant</li> */}
        <li  className='cursor-pointer text-xl font-medium text-primary flex justify-center items-center bg-white hover:bg-secLightBg transition-colors  rounded-xl p-3 gap-3' onClick={() => AddRoute(nodeData)}><RxUpdate className='text-2xl' /> Mise à jour</li>
        <li className='cursor-pointer text-xl font-medium text-red-600 flex  items-center gap-3 bg-white hover:bg-secLightBg transition-colors  rounded-xl p-3'  onClick={onDelete}><MdOutlineDeleteForever className='text-2xl' /> Supprimer</li>
      </ul>
    </div>
  );

  const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 px-11 py-9 rounded-2xl shadow-lg dark:shadow-white">
          <h2 className="mb-4 text-xl">Êtes-vous sûr de vouloir supprimer {" "}
              <span className="font-semibold text-primary dark:text-darkPrimary">
                {/* {userToDelete?.userName} */}
              </span>{" "}</h2>
          <div className="mt-6 flex justify-end space-x-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">Annuler</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded hover:bg-red-700 dark:hover:bg-red-400">Supprimer</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showNew && <CreateRoute routeId={selectedNode} parrentId={selectedNode} />}
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className='pt-7 bg-mainLightBg dark:bg-mainDarkBg'>
          <div className="flex flex-row justify-center items-center">
            <h3 className="text-3xl pt-3 font-bold text-primary dark:text-textDarkColor">Routes</h3>
          </div>
          <div className="">
            <div className="flex justify-start p-4 ">

            <div  onClick={() => AddRoute()}>
              <Button Text="Ajouter un Route" Icon={<AiOutlineSisternode />} />
            </div>
            </div>
            <div className="w-full h-screen " ref={containerRef}>
              <Tree
                data={data}
                translate={translate}
                renderCustomNodeElement={(rd3tProps) =>
                  renderNodeWithCustomEvents({ ...rd3tProps, setTooltip, showContextMenu, selectNode })
                }
                orientation="vertical"
                // initialDepth={0}
                separation={{ siblings: 2, nonSiblings: 2 }}
                allowForeignObjects={true}
          
              />
              {contextMenu.visible && <ContextMenu position={contextMenu.position} onDelete={handleDeleteNode} nodeData={contextMenu.nodeData} />}
              <ConfirmModal isOpen={confirmModal.visible} onClose={() => setConfirmModal({ visible: false, nodeData: null })} onConfirm={confirmDeleteNode} />
              <CustomTooltip visible={tooltip.visible} position={tooltip.position} data={tooltip.data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
