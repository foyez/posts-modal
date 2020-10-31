import React from 'react'
import './Backdrop.css'

export const Backdrop = ({ show, clicked }) =>
  show ? <div className="backdrop" onClick={clicked}></div> : null
