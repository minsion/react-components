import { useState } from 'react';
import TagInput from './components/TagInput/TagInput';
import Modal from './components/Modal/Modal';
import { Accordion, AccordionItem } from './components/Accordion/Accordion';

function App() {
  const [isModal, setModal] = useState(false);
  return (
    <>
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
            Lorem ipsum
          </AccordionItem>
          <AccordionItem label="B" index="2">
            Dolor sit amet
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}

export default App
