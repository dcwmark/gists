// PathRouter/server/index.test.js

'use strict';

import request from 'supertest';
import app from './index.js';

// Mock route handlers for testing
function mockRoute(req, res, next) {
  res.json({ message: `Handled by ${req.originalUrl}` });
}

// Patch the pathToMiddleware map for testing
app.locals.pathToMiddleware = {
  '/api/path1': mockRoute,
  '/api/path2': mockRoute,
};

describe('Express Server Routing', () => {
  test('should handle /api/path1', async () => {
    const res = await request(app).get('/api/path1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Handled by/);
  });

  test('should handle /api/path2/subroute', async () => {
    const res = await request(app).get('/api/path2/subroute');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Handled by/);
  });

  test('should return 404 for unknown route', async () => {
    const res = await request(app).get('/api/unknown');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Not Found');
  });
});