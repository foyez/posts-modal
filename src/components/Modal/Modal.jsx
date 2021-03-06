import React, { memo } from 'react'
import { Backdrop } from '../Backdrop/Backdrop'
import './Modal.css'

const Modal = ({ show, closeModal, children }) => {
  return (
    <>
      <Backdrop show={show} clicked={closeModal} />
      <div
        className="Modal"
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? 1 : 0,
        }}
      >
        {children}
      </div>
    </>
  )
}

export default memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children,
)
