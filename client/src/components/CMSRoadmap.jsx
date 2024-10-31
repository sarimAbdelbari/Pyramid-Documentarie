// import { useMemo } from 'react';
// import { TreeView, TreeItem } from '@mui/lab';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { TiHomeOutline } from "react-icons/ti";
// import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

// // Recursive function to convert routeData into a nested structure
// const createRouteTree = (routes) => {
//   const routeMap = {};
  
//   // Map each route by ID for easy access
//   routes.forEach(route => {
//     routeMap[route._id] = { ...route, children: [] };
//   });

//   const rootRoutes = [];
  
//   // Organize routes based on their parent-child relationships
//   routes.forEach(route => {
//     if (route.parrentPath && routeMap[route.parrentPath]) {
//       routeMap[route.parrentPath].children.push(routeMap[route._id]);
//     } else {
//       rootRoutes.push(routeMap[route._id]);
//     }
//   });

//   return rootRoutes;
// };

// // Tree view component for displaying the roadmap
// const RouteTree = ({ routeData }) => {
//   const nestedRoutes = useMemo(() => createRouteTree(routeData), [routeData]);

//   // Function to render the tree recursively
//   const renderTree = (nodes) => (
//     <TreeItem key={nodes._id} nodeId={nodes._id} label={nodes.title}>
//       {Array.isArray(nodes.children) && nodes.children.map((node) => renderTree(node))}
//     </TreeItem>
//   );

//   return (
//     <TreeView
//       aria-label="roadmap"
//       defaultCollapseIcon={<MdKeyboardArrowRight />}
//       defaultExpandIcon={<MdKeyboardArrowLeft />}
//       sx={{ maxHeight: 400, overflowY: 'auto', padding: '10px' }}
//     >
//       {nestedRoutes.map(route => renderTree(route))}
//     </TreeView>
//   );
// };

// // Depth bar component
// const DepthBar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   return (
//     <div className="fixed z-50 bottom-5 right-5 bg-white text-textLightColor dark:bg-secDarkBg dark:text-textDarkColor dark:shadow-white p-6 rounded-2xl shadow-lg flex justify-center items-center gap-5">
//       {location.pathname !== '/principal' && (
//         <MdKeyboardArrowLeft
//           onClick={() => navigate(-1)}
//           className="text-2xl text-textSecLightColor dark:text-textDarkColor cursor-pointer hover:text-darkPrimary hover:scale-125 ease-in-out duration-300"
//         />
//       )}
//       <Link to="/principal" className="text-2xl cursor-pointer mx-3 text-textSecLightColor hover:text-darkPrimary hover:scale-125 ease-in-out duration-300">
//         <TiHomeOutline className="text-2xl text-textLightColor dark:text-textDarkColor cursor-pointer hover:text-darkPrimary" />
//       </Link>
//       <MdKeyboardArrowRight
//         onClick={() => navigate(+1)}
//         className="text-2xl text-textSecLightColor hover:text-darkPrimary dark:text-textDarkColor cursor-pointer hover:scale-125 ease-in-out duration-300"
//       />
//     </div>
//   );
// };

// // Main component combining DepthBar and RouteTree
// const CMSRoadmap = ({ routeData }) => {
//   return (
//     <div>
//       <DepthBar />
//       <RouteTree routeData={routeData} />
//     </div>
//   );
// };

// export default CMSRoadmap;
