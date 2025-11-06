import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  const cover = project.images?.[0] ?? '/images/placeholder.svg';
  return (
    <article className="card">
      <Link href={`/project/${project.slug}`}>
      <Image className="card__media" src={cover} alt={project.name} width={800} height={250} />
      <div className="card__body">
        <h3 className="card__title">{project.name}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map(t => <span key={t} className="tags__tag">{t}</span>)}
        </div>
       
      </div>
       <p className="card__link">
          View project →
        </p>
      </Link>
    </article>
  );
}
