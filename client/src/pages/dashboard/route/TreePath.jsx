// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Tree from 'react-d3-tree';
// import Navbar from '@/components/navbar';
// import SideBar from '@/components/sidebar';
// import LoadingScreen from '@/utils/loadingScreen'
// import { useCenteredTree } from './helpers';

// const CustomTooltip = ({ visible, position, data }) => (
//   visible ? (
//     <div className="custom-tooltip flex gap-6 flex-col shadow-2xl" style={{ top: position.y, left: position.x }}>
//       {data.Image && <img src={`${import.meta.env.VITE_PUBLIC_URL1}/${data.Image}`} alt={data.Title} style={{ width: '100px', height: 'auto' }} />}
//       <h4>{data.Title}</h4>
//       <p>{data.Details}</p>
//     </div>
//   ) : null
// );

// const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode, wrapper, setTooltip }) => {
//   const y = -35;
//   const x =  -18;

//   const tooltipData = nodeDatum.attributes || {}; // Ensure data is available

//   return (
//     <g
//       ref={wrapper}
//       onMouseEnter={(e) => setTooltip({
//         visible: true,
//         position: { x: e.pageX, y: e.pageY },
//         data: tooltipData,
//       })}
//       onMouseLeave={() => setTooltip({
//         visible: false,
//         position: { x: 0, y: 0 },
//         data: {},
//       })}
//     >
//       <circle
//         r="20"
//         fill={nodeDatum.children ? "#0056b3" : "#ff5c5c"}
//         onClick={toggleNode}
//       />
//       <text fill="black" strokeWidth="1" x={x} y={y}>
//         {nodeDatum?.attributes?.Link || nodeDatum.name}
//       </text>
//     </g>
//   );
// };

// const transformData = (routeData) => {
//   const tree = {
//     name: 'Root',
//     children: [],
//     tooltip: 'Root Node'
//   };

//   const addNode = (pathParts, data, currentNode) => {
//     pathParts.forEach((part, index) => {
//       let childNode = currentNode.children.find(child => child.name === part);

//       if (!childNode) {
//         childNode = {
//           name: part,
//           attributes: {},
//           children: [],
//           tooltip: `Node: ${part}`
//         };
//         currentNode.children.push(childNode);
//       }

//       if (index === pathParts.length - 1) {
//         Object.keys(data).forEach(key => {
//           const dataTitle = data[key].Title;
//           if (!childNode.children.find(child => child.name === dataTitle)) {
//             const child = {
//               name: dataTitle,
//               attributes: data[key],
//               children: [],
//               tooltip: `Title: ${dataTitle}`
//             };
//             childNode.children.push(child);
//           }
//         });
//       }

//       currentNode = childNode;
//     });
//   };

//   routeData.forEach(route => {
//     const { path, data } = route;

//     if (path === '/') {
//       Object.keys(data).forEach(key => {
//         const dataTitle = data[key].Title;
//         if (!tree.children.find(child => child.name === dataTitle)) {
//           const child = {
//             name: dataTitle,
//             attributes: data[key],
//             children: [],
//             tooltip: `Title: ${dataTitle}`
//           };
//           tree.children.push(child);
//         }
//       });
//     } else {
//       const pathParts = path.split('/').filter(part => part);
//       addNode(pathParts, data, tree);
//     }
//   });

//   return tree;
// };

// const AddRouteModal = ({ isOpen, onClose, onSubmit }) => {
//   const [path, setPath] = useState('');
//   const [title, setTitle] = useState('');
//   const [image, setImage] = useState('');
//   const [link, setLink] = useState('');
//   const [details, setDetails] = useState('');
//   const [permission, setPermission] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ path, title, image, link, details, permission });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-md shadow-md">
//         <h2 className="mb-4 text-xl">Add Route</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-2">
//             <label>Path:</label>
//             <input value={path} onChange={(e) => setPath(e.target.value)} className="border p-1 w-full"/>
//           </div>
//           <div className="mb-2">
//             <label>Title:</label>
//             <input value={title} onChange={(e) => setTitle(e.target.value)} className="border p-1 w-full"/>
//           </div>
//           <div className="mb-2">
//             <label>Image:</label>
//             <input value={image} onChange={(e) => setImage(e.target.value)} className="border p-1 w-full"/>
//           </div>
//           <div className="mb-2">
//             <label>Link:</label>
//             <input value={link} onChange={(e) => setLink(e.target.value)} className="border p-1 w-full"/>
//           </div>
//           <div className="mb-2">
//             <label>Details:</label>
//             <textarea value={details} onChange={(e) => setDetails(e.target.value)} className="border p-1 w-full"/>
//           </div>
//           <div className="mb-2">
//             <label>Permission:</label>
//             <input value={permission} onChange={(e) => setPermission(e.target.value)} className="border p-1 w-full"/>
//           </div>
//           <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">Add</button>
//           <button type="button" onClick={onClose} className="bg-gray-500 text-white py-1 px-4 rounded ml-2">Cancel</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default function TreePath() {
//   const [data, setData] = useState(null);
//   const [tooltip, setTooltip] = useState({
//     visible: false,
//     position: { x: 0, y: 0 },
//     data: {}
//   });
//   const [loading, setLoading] = useState(true);
//   const [translate, containerRef] = useCenteredTree();
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     fetchRoutes();
//   }, []);

//   const fetchRoutes = () => {
//     setLoading(true);
//     axios.get(`${import.meta.env.VITE_API_URL}/route`)
//       .then(response => {
//         const transformedData = transformData(response.data);
//         setData(transformedData);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   };

//   const handleAddRoute = (newRoute) => {
//     axios.post(`${import.meta.env.VITE_API_URL}/route`, newRoute)
//       .then(response => {
//         fetchRoutes(); // Refresh the tree data
//         setModalOpen(false);
//       })
//       .catch(error => {
//         console.error('Error adding route:', error);
//       });
//   };

//   const handleUpdateRoute = (routeId, updatedRoute) => {
//     axios.put(`${import.meta.env.VITE_API_URL}/route/${routeId}`, updatedRoute)
//       .then(response => {
//         fetchRoutes(); // Refresh the tree data
//       })
//       .catch(error => {
//         console.error('Error updating route:', error);
//       });
//   };

//   const handleDeleteRoute = (routeId) => {
//     axios.delete(`${import.meta.env.VITE_API_URL}/route/${routeId}`)
//       .then(response => {
//         fetchRoutes(); // Refresh the tree data
//       })
//       .catch(error => {
//         console.error('Error deleting route:', error);
//       });
//   };

//   return (
//     <>
//       <div className="flex flex-row">
//         <SideBar />
//         <Navbar />
//       </div>
//       {loading ? (
//         <LoadingScreen />
//       ) : (
//         <div className="pt-24">
//           <div className="flex justify-start p-4 bg-gray-200">
//             <button onClick={() => setModalOpen(true)}>Add Route</button>
//             {/* Add buttons for update and delete */}
//           </div>
//           <div className="w-full h-screen bg-gray-200" ref={containerRef}>
//             <Tree
//               data={data}
//               translate={translate}
//               renderCustomNodeElement={(rd3tProps) =>
//                 renderNodeWithCustomEvents({ ...rd3tProps, setTooltip })
//               }
//               orientation="vertical"
//             />
//             <CustomTooltip {...tooltip} />
//           </div>
//         </div>
//       )}
//       <AddRouteModal 
//         isOpen={modalOpen} 
//         onClose={() => setModalOpen(false)} 
//         onSubmit={handleAddRoute} 
//       />
//     </>
//   );
// }


import { useState, useEffect } from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree';
import Navbar from '@/components/navbar';
import SideBar from '@/components/sidebar';
import LoadingScreen from '@/utils/loadingScreen'
import { useCenteredTree } from './helpers';
import Button from '../../../components/button';
import CreateRoute from './CreateRoute';

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

const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode, wrapper, setTooltip }) => {
  const y = -35;
  const x =  -18;

  const tooltipData = nodeDatum.attributes || {}; // Ensure data is available
  

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
  const tree = {
    name: 'Root',
    children: [],
    tooltip: 'Root Node'
  };

  const addNode = (pathParts, data, currentNode) => {
    pathParts.forEach((part, index) => {
      let childNode = currentNode.children.find(child => child.name === part);

      if (!childNode) {
        childNode = {
          name: part,
          attributes: {},
          children: [],
          tooltip: `Node: ${part}`
        };
        currentNode.children.push(childNode);
      }

      if (index === pathParts.length - 1) {
        Object.keys(data).forEach(key => {
          const dataTitle = data[key].Title;
          if (!childNode.children.find(child => child.name === dataTitle)) {
            const child = {
              name: dataTitle,
              attributes: data[key],
              children: [],
              tooltip: `Title: ${dataTitle}`
            };
            childNode.children.push(child);
          }
        });
      }

      currentNode = childNode;
    });
  };

  routeData.forEach(route => {
    const { path, data } = route;

    if (path === '/') {
      Object.keys(data).forEach(key => {
        const dataTitle = data[key].Title;
        if (!tree.children.find(child => child.name === dataTitle)) {
          const child = {
            name: dataTitle,
            attributes: data[key],
            children: [],
            tooltip: `Title: ${dataTitle}`
          };
          tree.children.push(child);
        }
      });
    } else {
      const pathParts = path.split('/').filter(part => part);
      addNode(pathParts, data, tree);
    }
  });

  return tree;
};




export default function TreePath() {
  const [data, setData] = useState(null);
  const [showAddRoute,setShowAddRoute]= useState(false);
  const [tooltip, setTooltip] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    data: {}
  });
  const [loading, setLoading] = useState(true);
  const [translate, containerRef] = useCenteredTree();

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
  }, []);

  const AddRoute = () =>{
    setShowAddRoute("false")
  }
  return (
    <>
      {showAddRoute && <CreateRoute/>}
      {loading ? (
        <LoadingScreen />
      ) : (<>
      <div className="flex flex-row">
        <SideBar />
        <Navbar />
      </div>
          <div className="pt-24">
            <div className="flex justify-start p-4 bg-gray-200" onClick={()=>AddRoute()}>
             <Button Text="Add Route"  />
            </div>
        <div className="w-full h-screen  bg-gray-200" ref={containerRef}>
        <Tree
            data={data}
            translate={translate}
            renderCustomNodeElement={(rd3tProps) =>
              renderNodeWithCustomEvents({ ...rd3tProps, setTooltip })
            }
            orientation="vertical"
            />
          <CustomTooltip {...tooltip} />
        </div>
            </div>
      </>
      )}
    </>
  );
}
