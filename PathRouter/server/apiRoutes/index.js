// PathRouter/server/apiRoutes/index.js

'use strict';

import { StatusCodes } from 'http-status-codes';

// Direct lookup map
const pathRouter = {
  '/api/path1': (_, res) =>
    res.status(StatusCodes.OK).json({ message: 'Handled by /api/path1' }),
  '/api/path2': (_, res) =>
    res.status(StatusCodes.OK).json({ message: 'Handled by /api/path2' }),
};

const apiRoutes = (app) => {
  // Custom "routing" middleware
  app.use((req, res, next) => {
    const requestPath = req.path;
    let matchedBaseUrl, matchedRouter;

    // --- Step 1: Find the longest matching prefix key ---
    for (const baseUrl of Object.keys(pathRouter)
                                .sort((a, b) => b.length - a.length)) {
      if (
        requestPath === baseUrl ||
        requestPath.startsWith(`${baseUrl}/`)
      ) {
        matchedBaseUrl = baseUrl;
        matchedRouter = pathRouter[baseUrl];
        break;
      }
    }

    // --- Step 2: Invoke the matched middleware/router or handle default ---
    if (matchedRouter) {
      const originalUrl = req.url;
      const originalPath = req.path;

      req.url = originalUrl.slice(matchedBaseUrl.length) || '/';

      matchedRouter(req, res, (err) => {
        if (err) return next(err);

        req.url = originalUrl;
        req.path = originalPath;

        if (!res.headersSent) next();
      });
    } else {
      next();
    }
  });
};

export default apiRoutes;
