import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/data/projects';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tagsParam = searchParams.get('tags'); // comma separated
  const slug = searchParams.get('slug');

  if (!tagsParam && !slug) {
    return NextResponse.json({ error: 'Provide either slug or tags query parameter.' }, { status: 400 });
  }

  if (slug) {
    const project = projects.find(p => p.slug === slug);
    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }
    return NextResponse.json(project);
  }

  const tags = tagsParam!.split(',').map(t => t.trim().toLowerCase());
  const match = projects.find(p => tags.every(t => p.tags.map(x => x.toLowerCase()).includes(t)));
  if (!match) {
    return NextResponse.json({ error: 'No project with the given tags.' }, { status: 404 });
  }
  return NextResponse.json(match);
}
