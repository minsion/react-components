//实现一个react弹框组件
import React, { useEffect } from 'react';

const Dialog = ({visible, title, children, width, height, className, onOk, onCancel, destroyOnClose,afterOpenChange, footer, keyboard}) => {
  const handleClickKeyboard = (event) => {
    if(event.keyCode === 27) {
      onCancel();
    }
  }
  useEffect(() => {
    afterOpenChange(() => {
      //
    })
    window.addEventListener("keydown", handleClickKeyboard)
  }, [visible, keyboard])
  useEffect(() => {
    if (keyboard) {
      window.addEventListener("keydown", handleClickKeyboard)
    }
  }, [])
  return (
    <>
      {visible && <div style={{width: width, height: height}} className={`modla-overlay ${className}`}>
        <div className='modal-dialog'>
          <div className="modal-header">
            <div className="title">{title}</div>
          </div>
          <div className="modal-content">{children}</div>
          {footer && <div className="modal-footer">
              <button onClick={onOk}>confirm</button>
              <button onClick={onCancel}>concel</button>
            </div>
          }
          </div>
      </div>}
    </>
  )
}

export default Dialog;
