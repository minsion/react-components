import { isEqual } from 'lodash';
import React, { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Dialog.css';

const arePropsEqual = (prevProps, nextProps) => {
	return isEqual(prevProps, nextProps);
}
const Dialog = (props) => {
	const {
		visible,
		title,
		children,
		width,
		height,
		className,
		onOk,
		sureText,
		onCancel,
		cancelText,
		destroyOnClose,
		afterOpenChange,
		footer,
		keyboard
	} = props
	let modalRoot = document.getElementById('modal-root');

	const handleClickKeyboard = (event) => {
		if(event.key === "Escape") {
			onCancel();
		}
	}
  useEffect(() => {
    keyboard && window.addEventListener("keydown", handleClickKeyboard)
		visible && afterOpenChange()
    return ()=> {
      window.removeEventListener("keydown", handleClickKeyboard)
    }
  }, []);
	

  return (
    <>
      {visible && createPortal(
        <div className="dialog-overview">
            <div className="dialog-inner" style={{width: width}}>
                <div className="dialog-header">{title}</div>
                <div className="dialog-body">{children}</div>
                <div className="dialog-footer">
                  {footer ? <>{footer}</> : <>
                    <button onClick={onCancel}>{cancelText || '取消'}</button>
                    <button onClick={onOk}>{sureText || '确定'}</button>
                  </>}
                </div>
            </div>
        </div>, modalRoot)}
    </>
  )
}

export default memo(Dialog, arePropsEqual)
