'use client'
import { useEffect, useRef } from 'react';

import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/lib/store'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  useEffect(() => {
    if (storeRef.current != null) {
      return setupListeners(storeRef.current.dispatch);
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>
}
