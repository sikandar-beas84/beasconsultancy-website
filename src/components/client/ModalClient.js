'use client';

import { useState, useEffect } from 'react';
import ModalComponent from './subcomponent/ModalComponent';

const ModalClient = () => {
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
      setShow(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return showModal ? <ModalComponent modalshow={show} /> : null;
};

export default ModalClient;