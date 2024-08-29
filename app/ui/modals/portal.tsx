'use client';

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function Portal({ children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === 'undefined') return null;

  return mounted ? ReactDOM.createPortal(children, document.getElementById('portal') as HTMLElement) : null;
}
