import { Suspense } from 'react';
import SuccessContent from './SuccessContent';

export const dynamic = 'force-dynamic';

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}