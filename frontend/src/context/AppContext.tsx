import React, { useState } from 'react';
import { AppContext } from './AppContextTypes';
import type { ToastMessage } from './AppContextTypes';
import Toast from '../components/Toast';

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage: ToastMessage) => {
          setToast(toastMessage);
        },
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)} // How onClose works? When toast is set to undefined, the Toast component is removed from the DOM, effectively closing it.
          // Before we set toast to undefined, the Toast component was set on some value, so it was visible. After that render,
          // function onClose set toast to undefined which prevented it from being visible.
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
