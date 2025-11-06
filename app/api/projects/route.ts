import { NextResponse } from 'next/server';
import { projects } from '@/lib/data/projects';

export async function GET() {
  const tags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();
  return NextResponse.json({ projects, tags });
}
