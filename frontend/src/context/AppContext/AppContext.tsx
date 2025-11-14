import React, { useState } from 'react';
import { AppContext } from './AppContextTypes';
import type { ToastMessage } from './AppContextTypes';
import Toast from '../../components/Toast';
import { useQuery } from '@tanstack/react-query';
import * as apiCLient from '../../api-client';
import { loadStripe, type Stripe } from '@stripe/stripe-js';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

const stripePromise: Promise<Stripe | null> = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const { isError } = useQuery({
    queryKey: ['validateToken'],
    queryFn: apiCLient.validateToken,
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage: ToastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise,
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
