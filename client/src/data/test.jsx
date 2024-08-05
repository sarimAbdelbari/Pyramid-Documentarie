import Tree from 'react-d3-tree';
import Navbar from '../../../components/navbar';
import SideBar from '../../../components/sidebar';


const treeData = {
  name: 'main',
  children: [
    {
      name: '/certification',
      children: [],
    },
    {
      name: '/Formation',
      children: [],
    },
    {
      name: '/SME',
      children: [],
    },
    {
      name: '/SMMET',
      children: [],
    },
    {
      name: '/dashboard',
      children: [
        {
          name: '/users',
          children: [],
        },
        {
          name: '/route',
          children: [],
        },
      ],
    },
    {
      name: 'disposition',
      children: [
        {
          name: 'System',
          children: [],
        },
        {
          name: 'legal',
          children: [
            {
              name: 'outer',
              children: [],
            },
            {
              name: 'int',
              children: [],
            },
          ],
        },
        {
          name: 'norms',
          children: [
            {
              name: 'outer',
              children: [],
            },
            {
              name: 'int',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

const customNodeStyles = {
  node: {
    name: {
      stroke: '#e0e0e0', // textDarkColor
      fill: '#e0e0e0', // textDarkColor
      fontSize: '16px',
    },
    attributes: {
      stroke: '#e0e0e0', // textDarkColor
      fill: '#e0e0e0', // textDarkColor
    },
  },
  links: {
    stroke: '#0056b3', // primary
  },
};

const TreePath = () => {
  return (
    <div className='min-h-screen bg-mainLightBg '>
         <Navbar/>
          <SideBar/>
    <div className="bg-mainLightBg dark:bg-mainDarkBg  h-screen p-6 rounded-lg shadow-2xl">
    <Tree 
        data={treeData} 
        translate={{ x: 200, y: 200 }} 
        nodeSvgShape={{ shape: 'circle', shapeProps: { r: 10, fill: '#002060' } }} // darkPrimary
        styles={customNodeStyles} 
        orientation="vertical" 
      />
    </div>
    </div> 
  );
};

export default TreePath;