// import { CloseCircleOutlined } from '@ant-design/icons';
// import { Modal, Tag, Tree } from 'antd';
// import React, { useEffect, useState } from 'react';
// import './index.css';

// const SelectModal = (props) => {
//   const { visible, onCancel } = props;
//   const treeData = [
//     {
//       title: '河南',
//       key: '0-0',
//       children: [
//         {
//           title: '郑州',
//           key: '0-0-0',
//           children: [
//             {
//               title: '东区',
//               key: '0-0-0-0',
//             },
//             {
//               title: '金水区',
//               key: '0-0-0-1',
//             },
//             {
//               title: '二七区',
//               key: '0-0-0-2',
//             },
//           ],
//         },
//         {
//           title: '0-0-1',
//           key: '0-0-1',
//           children: [
//             {
//               title: '0-0-1-0',
//               key: '0-0-1-0',
//             },
//             {
//               title: '0-0-1-1',
//               key: '0-0-1-1',
//             },
//             {
//               title: '0-0-1-2',
//               key: '0-0-1-2',
//             },
//           ],
//         },
//         {
//           title: '0-0-2',
//           key: '0-0-2',
//         },
//       ],
//     },
//     {
//       title: '0-1',
//       key: '0-1',
//       children: [
//         {
//           title: '0-1-0-0',
//           key: '0-1-0-0',
//         },
//         {
//           title: '0-1-0-1',
//           key: '0-1-0-1',
//         },
//         {
//           title: '0-1-0-2',
//           key: '0-1-0-2',
//         },
//       ],
//     },
//     {
//       title: '0-2',
//       key: '0-2',
//     },
//   ];
//   const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
//   const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
//   const [checkedItem, setCheckedItem] = useState([]);
//   const [autoExpandParent, setAutoExpandParent] = useState(true);

//   const onExpand = (expandedKeysValue) => {
//     setExpandedKeys(expandedKeysValue);
//     setAutoExpandParent(false);
//   };
//   const onCheck = (checkedKeysValue, e) => {
//     setCheckedKeys(checkedKeysValue);
//     setCheckedItem(e.checkedNodes.filter(item => item.children?.length));
//     console.log(888, e.checkedNodes, checkedItem);
//   };
//   useEffect(() => {

//   }, [])
  
//   return (
//     <div>
//       <Modal
//         wrapClassName="select-modal"
//         title="选择人员"
//         width={1000}
//         open={visible}
//         onCancel={onCancel}
//       >
//         <div className="content">
//           <div className="left">
//             <Tree
//               checkable
//               onExpand={onExpand}
//               expandedKeys={expandedKeys}
//               autoExpandParent={autoExpandParent}
//               onCheck={onCheck}
//               checkedKeys={checkedKeys}
//               treeData={treeData}
//             />
//           </div>
//           <div className="right">
//             {checkedItem?.map(item => {
//               return (
//                 <Tag closeIcon={<CloseCircleOutlined />}>{item?.title}</Tag>
//               )
//             })}
          
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default SelectModal;
import { TreeSelect } from 'antd';
import React, { useState } from 'react';
const { SHOW_PARENT } = TreeSelect;
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
      {
        title: 'Child Node2',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Child Node3',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];
const App = () => {
  const [value, setValue] = useState(['0-0']);
  const convertToFlat = (data) => {
    return data.reduce((acc, curr) => {
        acc.push({ ...curr });
        if (curr.children) {
          acc = acc.concat(convertToFlat(curr.children));
        }
        return acc;
    }, []);
  }
  const filterTreeArray = (flatTreeData, selectKeysArr) => {
    return flatTreeData.filter(item => {
      return selectKeysArr.indexOf(item.key) != -1
    }).map(item => {
      const {children, ...rest} = item;
      return rest;
    })
  }
  const onChange = (selectKeys) => {
    console.log('onChange', selectKeys, filterTreeArray(convertToFlat(treeData), selectKeys));
    setValue(selectKeys);
  };
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };
  return <TreeSelect {...tProps} />;
};
export default App;
