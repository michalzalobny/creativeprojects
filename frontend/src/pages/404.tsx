import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

export default function Error404() {
  const router = useRouter();

  const goToLanding = useCallback(() => {
    router.push('/');
  }, [router]);

  useEffect(() => {
    goToLanding();
  }, [goToLanding]);

  return null;
}
