'use client';
import Spinner from './Spinner';

type LoadingProps = {
  message?: string;
  className?: string;
};

export default function Loading({ message = 'Loading...', className }: LoadingProps) {
  return (
    <div className={className ?? 'loading'} aria-live="polite" aria-busy="true">
      <Spinner size={36} />
      <span>{message}</span>
    </div>
  );
}
