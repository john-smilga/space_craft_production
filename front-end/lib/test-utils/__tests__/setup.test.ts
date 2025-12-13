import { describe, it, expect } from 'vitest';
import { createUser, createStore, createProject, createDisplay, createPlanogram } from '../factories';

describe('Testing Infrastructure Setup', () => {
  describe('Factories', () => {
    it('should create a user with default values', () => {
      const user = createUser();
      
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.first_name).toBeDefined();
      expect(user.last_name).toBeDefined();
      expect(user.role).toBe('member');
      expect(user.company_id).toBeDefined();
      expect(user.company_name).toBeDefined();
    });

    it('should create a user with overrides', () => {
      const user = createUser({ email: 'test@example.com', role: 'admin' });
      
      expect(user.email).toBe('test@example.com');
      expect(user.role).toBe('admin');
    });

    it('should create a store', () => {
      const store = createStore();
      
      expect(store.id).toBeDefined();
      expect(store.slug).toBeDefined();
      expect(store.name).toBeDefined();
      expect(store.address).toBeDefined();
      expect(store.city).toBeDefined();
      expect(store.state).toBeDefined();
      expect(store.zip_code).toBeDefined();
    });

    it('should create a project', () => {
      const project = createProject();
      
      expect(project.id).toBeDefined();
      expect(project.slug).toBeDefined();
      expect(project.name).toBeDefined();
      expect(project.store_id).toBeDefined();
      expect(project.planogram_count).toBeGreaterThanOrEqual(0);
    });

    it('should create a display', () => {
      const display = createDisplay();
      
      expect(display.id).toBeDefined();
      expect(display.slug).toBeDefined();
      expect(display.name).toBeDefined();
      expect(display.width).toBeGreaterThan(0);
      expect(display.height).toBeGreaterThan(0);
      expect(display.depth).toBeGreaterThan(0);
      expect(['standard', 'custom']).toContain(display.display_type);
    });

    it('should create a planogram', () => {
      const planogram = createPlanogram();
      
      expect(planogram.id).toBeDefined();
      expect(planogram.slug).toBeDefined();
      expect(planogram.name).toBeDefined();
      expect(planogram.project_id).toBeDefined();
      expect(planogram.display_id).toBeDefined();
      expect(planogram.categories).toBeInstanceOf(Array);
      expect(planogram.categories.length).toBeGreaterThan(0);
      expect(['draft', 'published']).toContain(planogram.status);
    });
  });

  describe('Test Utils', () => {
    it('should have vitest globals available', () => {
      expect(describe).toBeDefined();
      expect(it).toBeDefined();
      expect(expect).toBeDefined();
    });
  });
});








