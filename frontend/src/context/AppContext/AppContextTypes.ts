import React from 'react';
import type { Stripe } from '@stripe/stripe-js';

export type ToastMessage = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

export type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);
