// import React, { useState, useEffect } from 'react';
// import { Tree, TreeNode } from 'react-organizational-chart';
// import axios from 'axios';
// import { sucess_toast, error_toast } from "../../../utils/toastNotification";

// const TreePath = ({ onSelectRoute }) => {
//   const [routes, setRoutes] = useState([]);

//   useEffect(() => {
//     fetchRoutes();
//   }, []);

//   const fetchRoutes = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/route");
//       setRoutes(data);
//     } catch (error) {
//       error_toast('Failed to fetch routes');
//       console.error(error);
//     }
//   };

//   const handleSelectRoute = (route) => {
//     onSelectRoute(route);
//   };

//   const renderTreeNodes = (route) => (
//     <TreeNode label={route.path} onClick={() => handleSelectRoute(route)}>
//       {route.children && route.children.map(child => renderTreeNodes(child))}
//     </TreeNode>
//   );

//   return (
//     <Tree
//       label={<div>Main Routes</div>}
//     >
//       {routes.map(route => renderTreeNodes(route))}
//     </Tree>
//   );
// };

// export default TreePath;
import React from 'react'

const TreePath = () => {
  return (
    <div>Tree</div>
  )
}

export default TreePath;