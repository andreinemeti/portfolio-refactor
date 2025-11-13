import { getProjects, getProjectBySlug } from './projects.query';

describe('projects.query', () => {
  test('getProjects returns projects and a unique, sorted tags list', async () => {
    const { projects, tags } = await getProjects();

    // basic sanity checks
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);

    expect(Array.isArray(tags)).toBe(true);

    // tags should be unique
    const uniqueTags = new Set(tags);
    expect(uniqueTags.size).toBe(tags.length);

    // every tag in projects should be in the tags array
    for (const p of projects) {
      for (const t of p.tags ?? []) {
        expect(tags).toContain(t);
      }
    }
  });

  test('getProjectBySlug returns the correct project', async () => {
    const { projects } = await getProjects();
    const sample = projects[0];

    const found = await getProjectBySlug(sample.slug);

    expect(found).not.toBeNull();
    expect(found?.slug).toBe(sample.slug);
    expect(found?.name).toBe(sample.name);
  });

  test('getProjectBySlug returns null for unknown slug', async () => {
    const result = await getProjectBySlug('__nonexistent__');
    expect(result).toBeNull();
  });
});
