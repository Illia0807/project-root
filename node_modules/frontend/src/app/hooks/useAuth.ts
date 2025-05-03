import { useToken } from './useToken';

export const useAuth = () => {
  const { getToken } = useToken();
  return !!getToken();
};
