import { useMutation } from '@tanstack/react-query';
import { useAppContext } from '../context/useAppContext';
import * as apiClient from '../api-client';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({
        message: 'Error Saving Hotel',
        type: 'ERROR',
      });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
};

export default AddHotel;
