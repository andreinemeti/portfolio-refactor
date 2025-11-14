import Link from 'next/link';
import MagneticItem from '../fx/MagneticItem';
import { ROUTES } from '@/utils/constants';


type Props = {
  title?: string;
  message?: string;
};

export default function NotFoundClient({
  title = 'Page not found',
  message = "The page you’re looking for doesn’t exist or has moved.",
}: Props) {
  return (
    <main className="nf">
    <div className="nf__card">
      {/* Friendly inline SVG */}
      <svg className="nf__art" viewBox="0 0 120 60" aria-hidden="true">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#ffb546" />
            <stop offset="1" stopColor="#f73614ff" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="120" height="60" rx="10" fill="#0b0f13" />
        <text x="50%" y="50%" dy="0.35em" textAnchor="middle" fontSize="22" fill="url(#g)" fontWeight="800">
          404
        </text>
      </svg>

      <h1 className="nf__title">{title}</h1>
      <p className="nf__subtitle">{message}</p>

      <div className="nf__actions">
        <MagneticItem className=""  radius={90} strength={0.22} tilt={3}>
        <Link href={ROUTES.HOME} className="btn btn--primary">Go Home</Link>
        </MagneticItem>
      </div>
    </div>
    </main>
  );
}
