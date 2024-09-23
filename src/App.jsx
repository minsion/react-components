import { useCallback, useEffect, useState } from 'react';
import { Accordion, AccordionItem } from './components/Accordion/Accordion';
import ChildComponent from './components/ChildComponent';
import Dialog from './components/Dialog/Dialog';
import Modal from './components/Modal/Modal';
import TagInput from './components/TagInput/TagInput';

function App() {
  const [isModal, setModal] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVisible2, setDialogVisible2] = useState(false);
  const [data, setData] = useState({})
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
  
  useEffect(() => {
    const res = {
      name: '跳转',
      linkUrl: 'http://www.baidu.com'
    }
    setData(res)
  }, [])
  return (
    <>
      <button onClick={handleClick}>{data.name}</button>
      <ChildComponent data={{name: 'mary'}} />
      <div className='wrapper-tag-input'>
        <h3>TagInput</h3>
        <TagInput tags={['Nodejs', 'MongoDB']} />
      </div>
      <div className='wrapper-tag-input'>
        <h3>Modal</h3>
        <button onClick={() => setModal(true)}>Click Here</button>
        <Modal
          isVisible={isModal}
          title="Modal Title"
          content={<p>Add your content here</p>}
          footer={<button onClick={() => setModal(false)}>Confirm</button>}
          onClose={() => setModal(false)}
        />
      </div>
      <div className='wrapper-tag-input'>
        <h3>Accordion</h3>
        <Accordion defaultIndex="1" onItemClick={console.log}>
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
    </>
  )
}

export default App
