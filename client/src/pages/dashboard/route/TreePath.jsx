import React, { createRef, useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import Navbar from '../../../components/navbar';
import SideBar from '../../../components/sidebar';
import { useCenteredTree } from './helpers';

const treeData = {
  name: 'main',
  children: [
    {
      name: '/certification',
      children: [],
    },
    {
      name: '/Formation',
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

const customNodeLightStyles = {
  node: {
    name: {
      stroke: '#1c1c1c', // textLightColor
      fill: '#1c1c1c', // textLightColor
      fontSize: '16px',
    },
    attributes: {
      stroke: '#1c1c1c', // textLightColor
      fill: '#1c1c1c', // textLightColor
    },
  },
  links: {
    stroke: '#0056b3', // primary
  },
};

const customNodeDarkStyles = {
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
    stroke: '#002060', // darkPrimary
  },
};

const CustomTooltip = ({ visible, position, text }) => (
  visible ? (
    <div className="custom-tooltip" style={{ top: position.y, left: position.x }}>
      {text}
    </div>
  ) : null
);

const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode, wrapper, setTooltip }) => {
  let y = 37;
  let x = -10;

  return (
    <g
      ref={wrapper}
      onMouseEnter={(e) => setTooltip({ visible: true, position: { x: e.pageX, y: e.pageY }, text: nodeDatum.name })}
      onMouseLeave={() => setTooltip({ visible: false, position: { x: 0, y: 0 }, text: '' })}
    >
      <circle
        r="20"
        fill={nodeDatum.children ? "#0056b3" : ""}
        onClick={
          nodeDatum.children
            ? toggleNode
            : () => {
                alert("End node Clicked");
                console.log(nodeDatum);
              }
        }
      />
      <text fill="black" strokeWidth="1" x={x.toString()} y={y.toString()}>
        {nodeDatum.name}
      </text>
    </g>
  );
};

const TreePath = () => {
  const [translate, containerRef] = useCenteredTree({ x: 200, y: 200 });
  const wrapper = createRef();
  const [tooltip, setTooltip] = useState({ visible: false, position: { x: 0, y: 0 }, text: '' });
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <div className="min-h-screen dark:bg-mainDarkBg bg-mainLightBg">
      <Navbar />
      <SideBar />
      <div className="min-h-screen dark:bg-mainDarkBg bg-mainLightBg h-screen p-6 rounded-lg shadow-2xl"  ref={containerRef}>
        <Tree
          data={treeData}
          collapsible={true}
          enableLegacyTransitions={true}
          initialDepth={1}
          orientation="vertical"
          depthFactor={170}
          translate={translate}
          styles={theme === 'dark' ? customNodeDarkStyles : customNodeLightStyles}
          renderCustomNodeElement={(props) =>
            renderNodeWithCustomEvents({ ...props, wrapper, setTooltip })
          }
        />
        <CustomTooltip visible={tooltip.visible} position={tooltip.position} text={tooltip.text} />
      </div>
    </div>
  );
};

export default TreePath;
