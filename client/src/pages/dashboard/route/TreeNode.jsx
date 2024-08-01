// TreeNode.js
import React from 'react';

const TreeNode = ({ node }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center">
        <div className="bg-white p-2 rounded-full shadow-md">{node.name}</div>
        {node.children && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 h-6 w-0.5 bg-gray-300"></div>
        )}
      </div>
      {node.children && (
        <div className="flex mt-4 space-x-6">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
