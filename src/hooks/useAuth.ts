import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import axiosInstance from '@/lib/axios';
import { showDataToast, showErrorToast } from '@/utils/common';
import { ROUTES } from '@/constants/pathName';
import { setUser } from '@/store/slices/userSlice';

export const useSignInAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (data: object) => axiosInstance.post('/auth/login', data),
    onSuccess: async data => {
      localStorage.setItem('token', data.data.token);

      dispatch(setUser({ data: data.data.used }));
      await queryClient.invalidateQueries({ queryKey: [ 'user' ] });
      showDataToast('Successfully Signed in');
      router.push('/');
    },
    onError: (error: AxiosError) => {
      showErrorToast((error?.response?.data as any)?.error);
    },
  });

  return { login, isPending };
};


export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => axiosInstance.post('/auth/logout'),
    onSuccess: async () => {
      dispatch(setUser(null));
      await queryClient.resetQueries({ queryKey: [ 'user' ] });
      showDataToast('Logged Out Successfully');
      localStorage.removeItem('token');
      setTimeout(() => {
        router.replace(ROUTES.SIGN_IN);
      }, 0);
    },
    onError: (error: AxiosError) => {
      showErrorToast((error?.response?.data as any)?.error);
    },
  });

  return { logout, isPending };
};

export const useGetUser = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [ 'user' ],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get('/auth/me', {
          headers: {
            'Cache-Control': 'no-cache, no-store',
            Pragma: 'no-cache',
            Expires: '0',
          },
        });

        return { data:response.data };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data,
    isPending,
    error,
    isAuthenticated: !!data,
  };
};
