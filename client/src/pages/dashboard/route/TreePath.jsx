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
  
  
const viewOptions = [
  { name: "View1", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View1.png` , titre:"Voir 1" },
  { name: "View2", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View2.png` , titre:"Voir 2"}, 
  { name: "View3", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View3.png` , titre:"Voir 3"}, 
  { name: "View4", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View4.png` , titre:"Voir 4" },
  { name: "View5", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View5.png` , titre:"Voir 5" },
  { name: "TableView", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/tableView.png` , titre:"Vue de table" },
  { name: "PdfReader", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/pfdReader.png` ,titre:"Lecteur PDF"},
  { name: "ExcelReader", imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/ExcelReader.png` ,titre:"Lecteur Excel"},
];


const getNodeColor = (viewType) => {
  switch (viewType) {
    // case "View1":
    //   return "#FFD700"; // Gold for view type 1
    // case "View2":
    //   return "#FF8C00"; // Dark Orange for view type 2
    // case "View3":
    //   return "#FF4500"; // Orange Red for view type 3
    // case "View4":
    //   return "#32CD32"; // Lime Green for view type 4
    // case "View5":
    //   return "#1E90FF"; // Dodger Blue for view type 5
    case 'TableView':
      return "#0056B3"; // Slate Blue for TableView
    case 'PdfReader':
      return "#C70100"; // Blue Violet for PDF Reader
    case 'ExcelReader':
      return "#007B23"; 
      default:
        return "#0400B3"; // Default colors
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
        r="20"
        fill={nodeColor}
        onClick={toggleNode}
        style={{
          transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
          transform: 'scale(0.1)', // Start with a small scale
          opacity: 0, // Start with opacity 0
          animation: `nodeAppear 0.5s forwards ease-in-out`,
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
      node.attributes = { ...node };  // Copy the node properties to attributes
      node.children.forEach(addAttributes);  // Recursively add attributes to children
    };
  
    roots.forEach(addAttributes);  // Apply attributes to all root nodes
  
    return roots;
    
    // const addNode = (pathParts, route, currentNode, routeId) => {
    //     pathParts.forEach((part, index) => {
    //         let childNode = currentNode.children.find(child => child.name === part);

    //         if (!childNode) {
    //             childNode = {
    //                 name: part,
    //                 attributes: { routeId }, // Assign routeId
    //                 children: [],
    //                 tooltip: `Nœud: ${part}`,
    //             };
    //             currentNode.children.push(childNode);
    //         }

    //         // If at the last part of the path, add the route details as attributes
    //         if (index === pathParts.length - 1) {
    //             childNode.attributes = {
    //                 ...route, // Use the entire route object for attributes
    //                 routeId
    //             };
    //             childNode.tooltip = `Titre: ${route.title}`;
    //         }

    //         currentNode = childNode;
    //     });
    // };

    // routeData.forEach(route => {
    //     const { path, _id: routeId } = route;

    //     if (path === '/main') {
    //         // Initialize the tree with the first route that has path "/"
    //         tree = {
    //             name: route.title || 'Racine',
    //             attributes: { ...route, routeId },
    //             children: [],
    //             tooltip: `Titre: ${route.title || 'Racine Nœud'}`,
    //         };
    //     } else if (tree) {
    //         const pathParts = path.split('/').filter(part => part);
    //         addNode(pathParts, route, tree, routeId);
    //     }
    // });

    // // Return the tree object if it was created, otherwise return null or an empty tree structure
    // return tree || { name: 'Aucune racine trouvée', children: [], tooltip: 'Pas de nœud racine' };
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="mb-4 text-xl">Es-tu sûr?</h2>
          <div className="flex justify-end">
            <button onClick={onConfirm} className="bg-red-500 text-white py-1 px-4 rounded mr-2">Oui</button>
            <button onClick={onClose} className="bg-gray-500 text-white py-1 px-4 rounded">Non</button>
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
              <Button Text="Ajouter un Route" />
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
