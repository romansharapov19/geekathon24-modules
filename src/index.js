import serverless from 'serverless-http';
import app from './app.js';

// Log Lambda Handler initialization
console.log('Lambda function is initialized and ready to handle requests.');

export const handler = serverless(app);
