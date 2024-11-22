import { useState } from 'react';

export default function useActivePage(initialPage = 'dashboard') {
  const [activePage, setActivePage] = useState(initialPage);

  return {
    activePage,
    setActivePage,
  };
}