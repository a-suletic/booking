import { useState } from 'react';
import { SearchContext } from './SearchContextType';

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [destination, setDestination] = useState<string>('');
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [hotelId, setHotelId] = useState<string>('');

  const saveSearchValues = (
    destination: string,
    adultCount: number,
    childCount: number,
    checkIn: Date,
    checkOut: Date,
    hotelId?: string
  ) => {
    setDestination(destination);
    setAdultCount(adultCount);
    setChildCount(childCount);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    if (hotelId) {
      setHotelId(hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        adultCount,
        childCount,
        checkIn,
        checkOut,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
