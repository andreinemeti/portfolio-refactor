// views/home/HomeView.test.tsx
import { render, screen } from '@testing-library/react';
import HomeView from './HomeView';
import type { Project } from '@/lib/data/projects.query';

// Mock FX-heavy components so tests are simpler & faster
jest.mock('@/components/fx/HeroFX', () => () => (
  <div data-testid="hero-fx" />
));

// ✅ Better ShatterTitle mock (see next section)
jest.mock('@/components/fx/ShatterTitle', () => {
  return ({ children, as = 'div', className }: any) => {
    const Tag = as as keyof JSX.IntrinsicElements;
    return (
      <Tag data-testid="shatter-title" className={className}>
        {children}
      </Tag>
    );
  };
});

jest.mock('@/components/fx/MagneticItem', () => {
  return ({ children, ...props }: any) => (
    <div data-testid="magnetic-item" {...props}>
      {children}
    </div>
  );
});

// ✅ NEW: mock FloatingTargetCursor so it doesn't call matchMedia
jest.mock('@/components/fx/FloatingTargetCursor', () => {
  return () => <div data-testid="floating-target-cursor" />;
});

const makeProject = (overrides: Partial<Project>): Project => ({
  id: 1,
  slug: 'demo-project',
  name: 'Demo Project',
  description: 'A demo project.',
  type: 'Website',
  tags: ['Next.js', 'TypeScript'],
  featured: true,
  responsiveness: '100%',
  images: ['/images/demo.jpg'],
  externalUrl: 'https://example.com',
  createdAt: '2024-01-01T00:00:00.000Z',
  lastMod: '2024-01-01T00:00:00.000Z',
  ...overrides,
});

describe('HomeView', () => {
  test('renders hero and featured projects', () => {
    const projects: Project[] = [
      makeProject({ id: 1, slug: 'proj-1', name: 'Project One', featured: true }),
      makeProject({ id: 2, slug: 'proj-2', name: 'Project Two', featured: false }),
      makeProject({ id: 3, slug: 'proj-3', name: 'Project Three', featured: true }),
    ];

    const featured = projects.filter((p) => p.featured);
    const tags = ['Next.js', 'TypeScript'];

    render(<HomeView projects={projects} featured={featured} tags={tags} />);

    // Hero text
    expect(screen.getByText("Hi, I'm Andrei")).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();

    // Featured section title
    expect(screen.getByText('Featured projects')).toBeInTheDocument();

    // Featured project names should be visible
    expect(screen.getByText('Project One')).toBeInTheDocument();
    expect(screen.getByText('Project Three')).toBeInTheDocument();

    // "See all projects" button shows total count
    expect(screen.getByText('(3)')).toBeInTheDocument();
  });
});
