import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './SecondModal.css';

const ModalContext = React.createContext();

export function SecondModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);

  }, [])

  return (

    <>

      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />

    </>
  );
}


export function SecondModal({ onClose, children, secondModalContent, className }) {


  const modalNode = useContext(ModalContext);

  if (!modalNode) return null;

  return ReactDOM.createPortal(

    <div id="second-modal">

      <div id="second-modal-background" onClick={onClose} />
         <div id="second-modal-content">
        {secondModalContent}
      </div>
      <div className={className}>

        {children}
      </div>
    </div>,
    modalNode
  );
}
