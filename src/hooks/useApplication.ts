import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export const useGetApplication = () => {

  const { data, isPending, error } = useQuery({
    queryKey: [ 'enquires' ],
    queryFn: () => axiosInstance.get('/applications/pending'),
  });

  return { data, isPending, error };
};

export const useGetApplicationById = (id: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: [ 'application', id ],
    queryFn: () => axiosInstance.get(`/applications/${id}`),
  });

  return { data, isPending, error };
};
export const useGetApplicationDocuments = (id: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: [ 'documents', id ],
    queryFn: () => axiosInstance.get(`/applications/${1}/documents`),
  });

  console.log('🚀 ~ useGetApplicationDocuments ~ data:', data);
  return { data, isPending, error };
};

export const useUpdateApplicationById = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => axiosInstance.patch(`/applications/${data.id}/review`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'applications' ] });
      queryClient.invalidateQueries({ queryKey: [ 'applications' ] });
    },
  });

  return { mutate, isPending };
};
