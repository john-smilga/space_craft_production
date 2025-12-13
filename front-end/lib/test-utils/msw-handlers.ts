import { http, HttpResponse } from 'msw';
import { createUser, createStore, createProject, createDisplay } from './factories';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const handlers = [
  // Auth handlers
  http.get(`${API_URL}/auth/me/`, () => {
    return HttpResponse.json({ user: createUser() });
  }),

  http.post(`${API_URL}/auth/login/`, async ({ request }) => {
    const body = await request.json();
    if (body && typeof body === 'object' && 'email' in body && body.email === 'test@example.com') {
      return HttpResponse.json({ user: createUser() });
    }
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  http.post(`${API_URL}/auth/logout/`, () => {
    return HttpResponse.json({ success: true });
  }),

  http.post(`${API_URL}/auth/register/`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ user: createUser(body && typeof body === 'object' ? body as Record<string, unknown> : {}) });
  }),

  // Stores handlers
  http.get(`${API_URL}/stores/`, () => {
    return HttpResponse.json({
      stores: [createStore(), createStore(), createStore()],
    });
  }),

  http.get(`${API_URL}/stores/:slug/`, ({ params }) => {
    return HttpResponse.json({ store: createStore({ slug: params.slug as string }) });
  }),

  http.post(`${API_URL}/stores/`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ store: createStore(body && typeof body === 'object' ? body as Record<string, unknown> : {}) });
  }),

  http.patch(`${API_URL}/stores/:slug/`, async ({ request, params }) => {
    const body = await request.json();
    return HttpResponse.json({
      store: createStore({
        slug: params.slug as string,
        ...(body && typeof body === 'object' ? body as Record<string, unknown> : {})
      })
    });
  }),

  http.delete(`${API_URL}/stores/:slug/`, () => {
    return HttpResponse.json({ success: true });
  }),

  // Projects handlers
  http.get(`${API_URL}/projects/`, () => {
    return HttpResponse.json({
      projects: [createProject(), createProject()],
    });
  }),

  http.get(`${API_URL}/projects/:slug/`, ({ params }) => {
    return HttpResponse.json({ project: createProject({ slug: params.slug as string }) });
  }),

  http.post(`${API_URL}/projects/`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ project: createProject(body && typeof body === 'object' ? body as Record<string, unknown> : {}) });
  }),

  http.patch(`${API_URL}/projects/:slug/`, async ({ request, params }) => {
    const body = await request.json();
    return HttpResponse.json({
      project: createProject({
        slug: params.slug as string,
        ...(body && typeof body === 'object' ? body as Record<string, unknown> : {})
      })
    });
  }),

  http.delete(`${API_URL}/projects/:slug/`, () => {
    return HttpResponse.json({ success: true });
  }),

  // Displays handlers
  http.get(`${API_URL}/displays/`, () => {
    return HttpResponse.json({
      displays: [createDisplay(), createDisplay(), createDisplay()],
    });
  }),

  http.get(`${API_URL}/displays/:slug/`, ({ params }) => {
    return HttpResponse.json({ display: createDisplay({ slug: params.slug as string }) });
  }),

  http.post(`${API_URL}/displays/`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ display: createDisplay(body && typeof body === 'object' ? body as Record<string, unknown> : {}) });
  }),

  http.delete(`${API_URL}/displays/:slug/`, () => {
    return HttpResponse.json({ success: true });
  }),

  // Users handlers
  http.get(`${API_URL}/users/`, () => {
    return HttpResponse.json({
      users: [createUser(), createUser({ role: 'admin' })],
    });
  }),

  http.post(`${API_URL}/users/invite/`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ user: createUser(body && typeof body === 'object' ? body as Record<string, unknown> : {}) });
  }),

  http.delete(`${API_URL}/users/:id/`, () => {
    return HttpResponse.json({ success: true });
  }),
];








