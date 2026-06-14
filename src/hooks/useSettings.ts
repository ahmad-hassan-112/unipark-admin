import axiosInstance from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';



export const useInviteUser = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => axiosInstance.post('/users', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'users' ] });
    },
  });

  return { mutate, isPending };
};
