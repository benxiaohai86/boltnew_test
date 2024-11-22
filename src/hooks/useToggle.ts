import { useState, useCallback } from 'react';

export default function useToggle(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, toggle, setIsOpen };
}