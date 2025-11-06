import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// If you have AppDispatch/RootState types, import them and use instead of `any` below.
// import type { AppDispatch, RootState } from '@/store';

type Project = {
  slug: string;
  name: string;
  description: string;
  responsiveness: string | null;
  type: string;
  tags: string[];
  images: string[];
  externalUrl?: string;
  createdAt: string;
  lastMod: string;
};

type State = {
  list: Project[];
  tags: string[];
  current?: Project;
  status: 'idle' | 'loading' | 'error';
  error?: string;
};

const initialState: State = { list: [], tags: [], status: 'idle' };

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setLoading(state) {
      state.status = 'loading';
      state.error = undefined;
    },
    setProjects(state, action: PayloadAction<{ projects: Project[]; tags: string[] }>) {
      state.status = 'idle';
      state.list = action.payload.projects;
      state.tags = action.payload.tags;
    },
    setCurrent(state, action: PayloadAction<Project | undefined>) {
      
      state.current = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    clearError(state) {
      state.error = undefined;
      if (state.status === 'error') state.status = 'idle';
    },
  },
});

export const { setLoading, setProjects, setCurrent, setError, clearError } = projectsSlice.actions;
export default projectsSlice.reducer;



// Fetch all projects
export const fetchProjects = () => async (dispatch: any /* AppDispatch */) => {
  try {
    dispatch(setLoading());
    const res = await fetch('/api/projects', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = (await res.json()) as { projects: Project[]; tags: string[] };
    dispatch(setProjects(data));
  } catch (e) {
    dispatch(setError((e as Error).message || 'Request failed'));
  }
};

// Fetch a single project by slug
export const fetchProjectBySlug = (slug: string) => async (dispatch: any /* AppDispatch */) => {
  try {
    dispatch(setLoading());
    const res = await fetch(`/api/project?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Project not found');
    const project = (await res.json()) as Project;
    dispatch(setCurrent(project));
    // Optionally return to idle after individual fetches:
    dispatch(clearError());
  } catch (e) {
    dispatch(setError((e as Error).message || 'Request failed'));
  }
};
