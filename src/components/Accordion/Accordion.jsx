import { useState } from 'react';
import './Accordion.css';

export const AccordionItem = ({ label, isCollapsed, handleClick, children }) => {
  return (
    <div className='item'>
      <div className="accordion-label" onClick={handleClick}>
        {label}
      </div>
      <div
        className={`accordion-item ${isCollapsed ? 'collapsed' : 'expanded'}`}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </div>
  );
};
export const Accordion = ({ defaultIndex, onItemClick, children }) => {
  const [bindIndex, setBindIndex] = useState(defaultIndex);

  const changeItem = itemIndex => {
    if (typeof onItemClick === 'function') onItemClick(itemIndex);
    if (itemIndex !== bindIndex) setBindIndex(itemIndex);
  };
  const items = children.filter(item => item.type.name === 'AccordionItem');

  return (
    <div className='wrapper-accordion'>
      {items.map(({ props }) => (
        <AccordionItem
          key={props.index}
          isCollapsed={bindIndex !== props.index}
          label={props.label}
          handleClick={() => changeItem(props.index)}
          children={props.children}
        />
      ))}
    </div>
  );
};
