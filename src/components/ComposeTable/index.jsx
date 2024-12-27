import { Table } from 'antd';
import React from 'react';
import { tableData } from './data';

const ComposeTable = () => {
  const mergeCells = (text, key, index, data) => {
    // 上一行该列数据是否一样
    if (index !== 0 && text === data[index - 1][key]) {
      return 0;
    }
    let rowSpan = 1;
    // 判断下一行是否相等
    for (let i = index + 1; i < data.length; i++) {
      if (text !== data[i][key]) {
        break;
      }
      rowSpan++;
    }
    return rowSpan;
  };
  const tableMergeRowRender = (text, key, index, data) => {
    const obj = {
      children: text !== null ? text : '',
      props: {},
    };
    obj.props.rowSpan = mergeCells(text, key, index, data);
    return obj;
  }

const columns = [
  {
    title: '111',
    children: [
      {
        title: 'L1',
        dataIndex: 'level1',
        key: 'L1',
        width: 130,
        render: (text, record, index) => tableMergeRowRender(text, 'level1', index, tableData),
      },
      {
        title: 'L2',
        dataIndex: 'level2',
        key: 'level2',
        width: 130,
        render: (text, record, index) => tableMergeRowRender(text, 'level2', index, tableData),
      },
      {
        title: 'L3',
        dataIndex: 'level3',
        key: 'level3',
        width: 150,
      },
      {
        title: 'L4',
        dataIndex: 'level4',
        key: 'level4',
        width: 150,
      },
    ]
  },
  {
    title: '222',
    children: [
      {
        title: '年级',
        dataIndex: 'grade',
        key: 'grade',
        width: 130,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 130,
      },
      {
        title: '出生年月',
        dataIndex: 'birthday',
        key: 'birthday',
        width: 150,
      },
    ]
  }
]

  
  return (
    <Table columns={columns} dataSource={tableData} bordered />
  );
}

export default ComposeTable;
