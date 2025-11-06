

type SpinnerProps = {
  size?: number;       // px
  strokeWidth?: number;
  className?: string;
  label?: string;      // accessible label
};

export default function Spinner({
  size = 32,
  strokeWidth = 3,
  className,
  label = 'Loading',
}: SpinnerProps) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;

  return (
    <svg
      className={`spinner ${className ?? ''}`}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="status"
      aria-label={label}
    >
      <circle
        className="spinner__track"
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        className="spinner__indicator"
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={c}
        strokeDashoffset={c * 0.75}
        strokeLinecap="round"
      />
    </svg>
  );
}
