import axiosInstance from '@/lib/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetCampus = () => {
  
  const { data, isPending } = useQuery({
    queryKey: [ 'campus' ],
    queryFn: () => axiosInstance.get('/campuses'),
  });

  return { data, isPending };
};

export const useGetCampusById = (id: string) => {
  const { data, isPending } = useQuery({
    queryKey: [ 'campus', id ],
    queryFn: () => axiosInstance.get(`/campuses/${id}/rules/`),
  });

  return { data, isPending };
};

export const useUpdateCampusById = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => axiosInstance.put(`/campuses/${data.id}/rules/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'campus' ] });
      queryClient.invalidateQueries({ queryKey: [ 'campus' ] });
    },
  });

  return { mutate, isPending };
};



export const useAddCampus = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => axiosInstance.post('/campuses', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'campus' ] });
    },
  });

  return { mutate, isPending };
};
