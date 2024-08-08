import { useState, useEffect } from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree';
import Navbar from '@/components/navbar';
import SideBar from '@/components/sidebar';
import LoadingScreen from '@/utils/loadingScreen';
import { useCenteredTree } from './helpers';
import Button from '@/components/button';
import CreateRoute from './CreateRoute';
import { useStateContext } from '@/contexts/ContextProvider';

const CustomTooltip = ({ visible, position, data }) => (
  visible ? (
    <>
    {data.Title && 
      <div className="custom-tooltip flex gap-6 flex-col shadow-2xl" style={{ top: position.y, left: position.x }}>
        {data.Image && <img src={`${import.meta.env.VITE_PUBLIC_URL1}/${data.Image}`} alt={data.Title} style={{ width: '100px', height: 'auto' }} />}
        <h4>{data.Title}</h4>
        <p>{data.Details}</p>
      </div>
   }
    </>
  ) : null
);

const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode, wrapper, setTooltip, showContextMenu }) => {
  const y = -35;
  const x =  -18;

  const tooltipData = nodeDatum.attributes || {};

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
    >
      <circle
        r="20"
        fill={nodeDatum.children ? "#0056b3" : "#ff5c5c"}
        onClick={toggleNode}
      />
      <text fill="black" strokeWidth="1" x={x} y={y}>
        {nodeDatum?.attributes?.Link || nodeDatum.name}
      </text>
    </g>
  );
};

const transformData = (routeData) => {
  console.log("routeData", routeData);

  const tree = {
    name: 'Root',
    children: [],
    tooltip: 'Root Node',
  };

  const addNode = (pathParts, data, currentNode, routeId) => {
    pathParts.forEach((part, index) => {
      let childNode = currentNode.children.find(child => child.name === part);

      if (!childNode) {
        childNode = {
          name: part,
          attributes: {},
          children: [],
          tooltip: `Node: ${part}`,
        };
        currentNode.children.push(childNode);
      }

      if (index === pathParts.length - 1) {
        Object.keys(data).forEach(key => {
          const dataItem = data[key];
          const dataTitle = dataItem.Title;
          if (!childNode.children.find(child => child.name === dataTitle)) {
            const child = {
              name: dataTitle,
              attributes: { ...dataItem, routeId, itemId: dataItem._id },  // Include routeId and itemId
              children: [],
              tooltip: `Title: ${dataTitle}`,
            };
            childNode.children.push(child);
          }
        });
      }

      currentNode = childNode;
    });
  };

  routeData.forEach(route => {
    const { path, data, _id: routeId } = route;  // Get the routeId

    if (path === '/') {
      Object.keys(data).forEach(key => {
        const dataItem = data[key];
        const dataTitle = dataItem.Title;
        if (!tree.children.find(child => child.name === dataTitle)) {
          const child = {
            name: dataTitle,
            attributes: { ...dataItem, routeId, itemId: dataItem._id },  // Include routeId and itemId
            children: [],
            tooltip: `Title: ${dataTitle}`,
          };
          tree.children.push(child);
        }
      });
    } else {
      const pathParts = path.split('/').filter(part => part);
      addNode(pathParts, data, tree, routeId);  // Pass routeId to addNode
    }
  });

  return tree;
};


const ContextMenu = ({ position, onDelete }) => (
  <div className="context-menu fixed bg-white shadow-lg rounded" style={{ top: position.y, left: position.x }}>
    <ul>
      <li onClick={onDelete}>Delete</li>
    </ul>
  </div>
);

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="mb-4 text-xl">Are you sure?</h2>
        <div className="flex justify-end">
          <button onClick={onConfirm} className="bg-red-500 text-white py-1 px-4 rounded mr-2">Yes</button>
          <button onClick={onClose} className="bg-gray-500 text-white py-1 px-4 rounded">No</button>
        </div>
      </div>
    </div>
  );
};

export default function TreePath() {
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

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/route`)
      .then(response => {
        const transformedData = transformData(response.data);
        console.log("response.data &&",response.data)
        console.log("transformedData &&",transformedData)
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

  const confirmDeleteNode = async () => {
    const routeToDelete = confirmModal.nodeData;
  
    if (routeToDelete) {
      const { routeId, itemId } = routeToDelete.attributes;  // Extract routeId and itemId
  
      try {
        // /:routeId/data/:itemId
        await axios.delete(`${import.meta.env.VITE_API_URL}/route/${routeId}/data/${itemId}`);
        setConfirmModal({ visible: false, nodeData: null });
        axios.get(`${import.meta.env.VITE_API_URL}/route`)
          .then(response => {
            const transformedData = transformData(response.data);
            setData(transformedData);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      } catch (error) {
        console.error('Error deleting node:', error);
      }
    }
  };
  

  const AddRoute = () => {
    setShowNew(true);
  };

  return (
    <>
      {showNew && <CreateRoute />}
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="flex flex-row">
            <SideBar />
            <Navbar />
          </div>
          <div className="pt-24">
            <div className="flex justify-start p-4 bg-gray-200" onClick={() => AddRoute()}>
              <Button Text="Add Route" />
            </div>
            <div className="w-full h-screen bg-gray-200" ref={containerRef}>
              <Tree
                data={data}
                translate={translate}
                renderCustomNodeElement={(rd3tProps) =>
                  renderNodeWithCustomEvents({ ...rd3tProps, setTooltip, showContextMenu })
                }
                orientation="vertical"
              />
              <CustomTooltip {...tooltip} />
              {contextMenu.visible && (
                <ContextMenu
                  position={contextMenu.position}
                  onDelete={handleDeleteNode}
                />
              )}
              <ConfirmModal
                isOpen={confirmModal.visible}
                onClose={() => setConfirmModal({ visible: false, nodeData: null })}
                onConfirm={confirmDeleteNode}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
