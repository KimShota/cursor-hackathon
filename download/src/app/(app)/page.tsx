'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/chat');
  }, [router]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
