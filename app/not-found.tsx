import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="nf">
      <div className="nf__card">
        {/* Friendly inline SVG */}
        <svg className="nf__art" viewBox="0 0 120 60" aria-hidden="true">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="120" height="60" rx="10" fill="#0b0f13" />
          <text x="50%" y="50%" dy="0.35em" textAnchor="middle" fontSize="22" fill="url(#g)" fontWeight="800">404</text>
        </svg>

        <h1 className="nf__title">Page not found</h1>
        <p className="nf__subtitle">
          The page you’re looking for doesn’t exist or has moved.
        </p>

        <div className="nf__actions">
          <Link href="/" className="btn btn--primary">Go Home</Link>
          <Link href="/project" className="btn btn--ghost">Browse Projects</Link>
        </div>
      </div>
    </main>
  );
}
