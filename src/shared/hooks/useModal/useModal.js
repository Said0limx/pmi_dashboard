'use client';
import { useState } from 'react';

export const useModal = (defaultState = false) => {
  const [modal, setModal] = useState({
    id: null,
    data: null,
    opened: defaultState,
  });

  const toggle = () => {
    setModal((prev) => ({
      opened: !prev.opened,
    }));
  };

  const open = (id = null) =>
    setModal({
      id,
      opened: true,
    });

  const close = () => setModal({ id: null, opened: false, data: null });
  const openWithData = (data) => setModal({ id: null, data, opened: true });

  return { modal, toggle, open, close, openWithData };
};
