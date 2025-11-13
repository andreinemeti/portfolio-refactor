import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/data/projects.query';
import NextIcon from '@/components/icons/NextIcon';
export default function ProjectCard({ project }: { project: Project }) {

  const cover = project.images?.[0] ?? '/images/placeholder-landscape.svg';
  const uniqueTags = Array.from(new Set(project.tags ?? []));
  return (
    <article className="card">
      
      <Link href={`/project/${project.slug}`}>

      <div className="card__relative-parent">
         {/* Ribbon */}
      {project.featured && (
        <span className="card__ribbon" aria-label="Featured">Featured</span>
      )}
        <Image 
        className="card__media" 
        src={cover} alt={project.name} 
        width={800} 
        height={200} 
        draggable={false}
        />
         {/* <p className="card__link">
          <span className="card__link__text">View project </span>
          <NextIcon className="icon" size={20}/>
        </p> */}
      </div>
      <div className="card__body">
        <h3 className="card__title">{project.name}</h3>
        <p>{project.description}</p>
        <div className="pill-list smaller">
          {uniqueTags.map(t => <span key={t} className="pill">{t}</span>)}
        </div>
       
      </div>
      
      </Link>
    </article>
  );
}
