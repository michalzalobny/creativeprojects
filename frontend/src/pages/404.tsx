import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Error404() {
  const router = useRouter();

  const goToLanding = () => {
    router.push('/');
  };

  useEffect(() => {
    goToLanding();
  }, []);

  return null;
}
