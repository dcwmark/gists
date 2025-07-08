// PathRouter/server/index.js

'use strict';

import express from 'express';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import sanitize from 'internal-sanitize-middleware';
import 'dotenv/config';

import apiRoutes from './apiRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(helmet());
app.use(sanitize());

//* API routes registrar */
apiRoutes(app);
//* -------------------- */

// --- Global 404 handler (your 'default' idea) ---
// This middleware should be placed AFTER all your custom routing.
app.use((_, res) => {
  res.status(StatusCodes.NOT_FOUND)
     .send('Not Found');
});

// --- Global Error handler (optional but recommended) ---
app.use((err, _, res, __) => {
  console.error(err.stack);
  if (!res.headersSent) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
       .send('Something broke!');
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
