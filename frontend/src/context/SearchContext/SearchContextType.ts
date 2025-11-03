import { createContext } from 'react';

export type SearchContextType = {
  destination: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    adultCount: number,
    childCount: number,
    checkIn: Date,
    checkOut: Date
  ) => void;
};

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);
