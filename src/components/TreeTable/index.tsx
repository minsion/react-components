import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

const TreeTable = props => {
  const [optRecords, setOptRecords] = useState<any>([])

  let position = 0 // 表格合并的位置,哪一行需要展示
  const optRecordsColums = [
    {
      dataIndex: 'customer',
      title: '客户名称',
      render: (d, item, index) => {
        const obj = {
          children: d,
          props: {rowSpan: 0}
        }
        if (index === 0) {
          obj.props.rowSpan = item.rowLength
          position = item.rowLength
        }
        if (index === position) {
          obj.props.rowSpan = item.rowLength
          position += item.rowLength
        }
        return obj
      }
    },
    {
      dataIndex: 'relation',
      title: '业务'
    },
    {
      dataIndex: 'amount',
      title: '金额'
    },
    {
      dataIndex: 'time',
      title: '时间'
    }
  ]
  // 数据1
  const data = [
    {
      id: 1,
      customer: '客户1',
      relation: '业务1',
      amount: '10000',
      time: '2020-1-1'
    },
    {
      id: 2,
      customer: '客户1',
      relation: '业务2',
      amount: '20000',
      time: '2020-2-2'
    },
    {
      id: 3,
      customer: '客户2',
      relation: '业务2',
      amount: '30000',
      time: '2020-2-2'
    },
    {
      id: 4,
      customer: '客户3',
      relation: '业务1',
      amount: '30000',
      time: '2020-2-2'
    },
    {
      id: 5,
      customer: '客户3',
      relation: '业务2',
      amount: '30000',
      time: '2020-2-2'
    },
    {
      id: 6,
      customer: '客户3',
      relation: '业务3',
      amount: '30000',
      time: '2020-2-2'
    }
  ]

  // 数据2
  const data2 = [
    {
      customerid: 1,
      customer: '客户1',
      children: [
        {
          id: 1,
          relation: '业务1',
          amount: '10000',
          time: '2020-1-1',
        },
        {
          id: 2,
          relation: '业务2',
          amount: '20000',
          time: '2020-2-2'
        }
      ]
    },
    {
      customerid: 2,
      customer: '客户2',
      children: [
        {
          id: 3,
          relation: '业务2',
          amount: '330000',
          time: '2020-1-1',
        }
      ]
    },
    {
      customerid: 4,
      customer: '客户3',
      children: [
        {
          id: 4,
          relation: '业务1',
          amount: '10000',
          time: '2020-1-1',
        },
        {
          id: 5,
          relation: '业务2',
          amount: '20000',
          time: '2020-2-2'
        },
        {
          id: 6,
          relation: '业务3',
          amount: '20000',
          time: '2020-2-2'
        }
      ]
    }
  ]


  // 数据1处理,key: 需要对哪一个属性进行合并,这里的值和column里面的dataIndex一致
  const handleData = (key) => {
    // 获取到合并数据的重复数量
    const sunArr = data.reduce((acc, cur) => {
      if (!acc[cur[key]]) {
        acc[cur[key]] = 0
      }
      acc[cur[key]]++
      return acc
    }, {})
    // 获取的结果{客户1: 2, 客户2: 1, 客户3: 3} 
    let obj: any = {}
    // 给渲染数据增加合并行数
    const newArr: any = data.map(item => {
      obj = {...item}
      if (sunArr[item[key]]) {
        obj.rowLength = sunArr[item[key]]
      }
      return obj
    })
    setOptRecords(newArr)
    // console.log(sunArr, newArr)
  }

  // 数据2处理
  const handleData2 = () => {
    let newArr: any = []
    data2.map((item: any) => {
      if (item.children) {
        item.children.forEach((subItem, i) => {
          let obj: any = {...item}
          Object.assign(obj, subItem)
          delete obj.children
          obj.rowLength = item.children.length
          newArr.push(obj)
        })
      }
    })
    setOptRecords(newArr)
  }

  useEffect(() => {
    // 数据1
    handleData('customer')
    // 数据2
    // handleData2()
  }, [])

  return (
    <Table
      rowKey="id"
      pagination={false}
      bordered
      columns={optRecordsColums}
      dataSource={optRecords}
    />
  )
}
export default TreeTable;