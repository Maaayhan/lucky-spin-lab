import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import spinRouter from './routes/spin';

const app = express();
const PORT = process.env['PORT'] ?? 3001;

// Middleware
app.use(cors({ origin: process.env['CLIENT_ORIGIN'] ?? 'http://localhost:5173' }));
app.use(express.json());
app.use(requestLogger);

// Rate limiting: max 60 spin requests per minute per IP
const spinLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Too many requests. Please slow down.' },
});
app.use('/api', spinLimiter);

// Routes
app.use('/api', spinRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Lucky Spin Lab server running on port ${PORT}`);
});

export default app;
