import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useGetCustomers = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [ 'customers' ],
    queryFn: () => axiosInstance.get('/users'),
  });

  return { data, isPending, error };
};

export const useGetCustomerById = (id: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: [ 'customer', id ],
    queryFn: () => axiosInstance.get(`/users/${id}`),
  });

  return { data, isPending, error };
};


export const useUpdateUserById = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => axiosInstance.patch(`/users/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'campus' ] });
      queryClient.invalidateQueries({ queryKey: [ 'campus' ] });
    },
  });

  return { mutate, isPending };
};
