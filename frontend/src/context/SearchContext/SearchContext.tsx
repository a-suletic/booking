import { useState } from 'react';
import { SearchContext } from './SearchContextType';

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [destination, setDestination] = useState<string>(
    () => sessionStorage.getItem('destination') || ''
  );
  const [adultCount, setAdultCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem('adultCount') || '1')
  );
  const [childCount, setChildCount] = useState<number>(() =>
    parseInt(sessionStorage.getItem('childCount') || '0')
  );
  const [checkIn, setCheckIn] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem('checkIn') || new Date().toISOString())
  );
  const [checkOut, setCheckOut] = useState<Date>(
    () =>
      new Date(sessionStorage.getItem('checkOut') || new Date().toISOString())
  );
  const [hotelId, setHotelId] = useState<string>(
    () => sessionStorage.getItem('hotelId') || ''
  );

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
      sessionStorage.setItem('hotelId', hotelId);
    }
    sessionStorage.setItem('destination', destination);
    sessionStorage.setItem('adultCount', adultCount.toString());
    sessionStorage.setItem('childCount', childCount.toString());
    sessionStorage.setItem('checkIn', checkIn.toISOString());
    sessionStorage.setItem('checkOut', checkOut.toISOString());
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
