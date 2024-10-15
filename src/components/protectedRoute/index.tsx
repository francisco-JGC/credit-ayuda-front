import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authProvider';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user === null) {
        navigate('/login', { replace: true });
      }
    }
  }, [navigate, user, isLoading]);

  if (isLoading) {
    return <div></div>
  }

  return children;
}
