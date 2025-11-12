// components/ProjectsSkeleton.tsx
type Props = { count?: number };
export default function ProjectsSkeleton({ count = 6 }: Props) {
  return (
    <div className="flex-container">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-container">
          <div className="card-target">
            <div className="skeleton card">
                
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
