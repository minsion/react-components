import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal, Tag, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.css';

const SelectModal = (props) => {
  const { visible, onCancel } = props;
  const treeData = [
    {
      title: '河南',
      key: '0-0',
      children: [
        {
          title: '郑州',
          key: '0-0-0',
          children: [
            {
              title: '东区',
              key: '0-0-0-0',
            },
            {
              title: '金水区',
              key: '0-0-0-1',
            },
            {
              title: '二七区',
              key: '0-0-0-2',
            },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            {
              title: '0-0-1-0',
              key: '0-0-1-0',
            },
            {
              title: '0-0-1-1',
              key: '0-0-1-1',
            },
            {
              title: '0-0-1-2',
              key: '0-0-1-2',
            },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        {
          title: '0-1-0-0',
          key: '0-1-0-0',
        },
        {
          title: '0-1-0-1',
          key: '0-1-0-1',
        },
        {
          title: '0-1-0-2',
          key: '0-1-0-2',
        },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];
  const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
  const [checkedItem, setCheckedItem] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue, e) => {
    setCheckedKeys(checkedKeysValue);
    setCheckedItem(e.checkedNodes);
    console.log('onCheck', checkedKeysValue, e);
  };
  const finditem = (arr, key) => {
    let obj = "";
    finditemx(arr, key);
    return obj;
    function finditemx(arr, key) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item.key === key) {
          obj = item;
          break;
        }
        if (item.children) {
          finditemx(item.children, key);
        }
      }
    }
  };
  const getCheckedNodes = (data) => {
    const checkedNodes = [];
    const traverse = function(node) {
      const childNodes = node.children ? node.children : [];
      childNodes?.forEach(child => {
        checkedNodes.push(child);
      });
    };
    traverse(data)
    return checkedNodes;
  }
  useEffect(() => {
    const currentItem = finditem(treeData, '0-0-0');
    const currentItemChildren = getCheckedNodes(currentItem);
    console.log(999,currentItem, getCheckedNodes(currentItem));
    setCheckedItem(currentItemChildren)
  }, [])


  
  return (
    <div>
      <Modal
        wrapClassName="select-modal"
        title="选择人员"
        width={1000}
        open={visible}
        onCancel={onCancel}
      >
        <div className="content">
          <div className="left">
            <Tree
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              treeData={treeData}
            />
          </div>
          <div className="right">
            {checkedItem?.map(item => {
              return (
                <Tag closeIcon={<CloseCircleOutlined />}>{item?.title}</Tag>
              )
            })}
          
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SelectModal;
