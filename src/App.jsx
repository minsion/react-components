
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Accordion, AccordionItem } from './components/Accordion/Accordion';
import ChildComponent from './components/ChildComponent';
import ComposeTable from './components/ComposeTable';
import Dialog from './components/Dialog/Dialog';
import SelectModal from './components/SelectModal';
import TagInput from './components/TagInput/TagInput';
import TreeTable from './components/TreeTable';

function App() {
  const [urlForm] = Form.useForm();
  const [isModal, setModal] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisible2, setDialogVisible2] = useState(false);
  const [data, setData] = useState({});
  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const htmlRef = useRef();
  let html = `
    <div>This wil be rendered</div>
    <script>
      console.log('testing')
    </script>
  `
  const parseHTML = (htmlStr) => {
    htmlStr = htmlStr?.replace(/<script\b[^>]*>/g,'&lt;script&gt;')?.replace(/<\/script>/g,'&lt;script&gt;')
    return htmlStr;
  }
  const handleClick = useCallback(() => {
    window.location.href = data.linkUrl
  }, [data])
  const dialogProps = {
    visible: dialogVisible,
    title: "dialog Title",
    keyboard: true,
    cancelText: "残忍离开",
    sureText: "我再想想",
    content: `<p>Add your content here</p>`,
    destroyOnClose: false,
    afterOpenChange: () => {console.log('afterOpenChange回掉接口')},
    onCancel: () => setDialogVisible(false),
    onOk: () => setDialogVisible(false),
  }
  const dialogProps2 = {
    visible: dialogVisible2,
    title: "dialog Title",
    keyboard: true,
    cancelText: "残忍离开",
    sureText: "我再想想",
    content: `<p>Add your content here</p>`,
    destroyOnClose: false,
    afterOpenChange: () => {console.log('afterOpenChange回掉接口')},
    onCancel: () => setDialogVisible2(false),
    onOk: () => setDialogVisible2(false),
  }
  const getCurrentWeek = () => {
    let tempWeekArr = [];
    for (var i = 0; i < 7; i++) {
      tempWeekArr.push(dayjs().startOf('week').add(i, 'day').format("YYYY-MM-DD"))
    }
    // ['2024-12-22', '2024-12-23', '2024-12-24', '2024-12-25', '2024-12-26', '2024-12-27', '2024-12-28']
    return tempWeekArr;
  }
  const isBetweenTime = (currentDate, timeQuantum) => {
    let isBetween = true;
    let currentTime = new Date(currentDate);
    let startTime = new Date(timeQuantum[0]);
    let endTime = new Date(timeQuantum[1]);
    let t1 = currentTime.getTime() - startTime.getTime();
    let t2 = currentTime.getTime() - endTime.getTime();
    if (t1 < 0 || t2 > 0) {
      isBetween = false;
    } 
    return isBetween;
  }

  useEffect(() => {
    const res = {
      name: '跳转',
      linkUrl: 'http://www.baidu.com'
    }
    setData(res)
    getCurrentWeek();
  }, [])
  
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
  const handleChange = () => {
    setSelectModalVisible(true);
  }
  const handleCancel = () => {
    setSelectModalVisible(false);
  }
  const onFinish = async () => {
    const values = await urlForm.validateFields();
    console.log(666, values);
  }
  return (
    <>
      <div className='wrapper-tag-input'>
        <h3>Modal</h3>
        <button onClick={() => {setModal(true); urlForm.setFieldValue({names: []})}}>Click Here</button>
        <Modal
          open={isModal}
          title="Modal Title"
          footer={<button onClick={onFinish}>Confirm</button>}
          onClose={() => setModal(false)}
        >
          <Form name="dynamic_form_item" form={urlForm}initialValues={{ urlItems: [{}] }}>
            <Form.List name="urlItems">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(({ key, name}, index) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        name={[name, 'fileName']}
                        rules={[{ required: true, message: '请输入' }]}
                      >
                        <Input style={{width: '300px'}} placeholder="请输入" />
                      </Form.Item>
                      {fields.length > 1 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                      {fields.length - index === 1 ? <PlusOutlined onClick={() => add()} /> : null}
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form>
        </Modal>
      </div>
      <h3>SelectModal</h3>
      <Select
        popupClassName='select-hidden'
        defaultValue="a1"
        onClick={handleChange}
        style={{ width: 200 }}
      />
      <br />
      <br />
      <SelectModal visible={selectModalVisible} onCancel={handleCancel} />
      <br />
      <br />
      <ComposeTable />
      <TreeTable />
      <button onClick={handleClick}>{data.name}</button>
      <ChildComponent data={{name: 'mary'}} />
      <div className='wrapper-tag-input'>
        <h3>TagInput</h3>
        <TagInput tags={['Nodejs', 'MongoDB']} />
      </div>
      
      <div className='wrapper-tag-input'>
        <h3>Accordion</h3>
        <Accordion defaultIndex="1">
          <AccordionItem label="A" index="1">
            AAAAAA
          </AccordionItem>
          <AccordionItem label="B" index="2">
            BBBBBB
          </AccordionItem>
        </Accordion>
      </div>
      <div className='wrapper-tag-input'>
        <h3>Dialog</h3>
        <button onClick={() => setDialogVisible(true)}>show dialog111 </button>
        {dialogVisible && <Dialog {...dialogProps} />}
        <button onClick={() => setDialogVisible2(true)}>show dialog222 </button>
        {dialogVisible2 && <Dialog {...dialogProps2} />}
      </div>
      <div dangerouslySetInnerHTML={{__html: parseHTML(html)}}></div>
    </>
  )
}

export default App
