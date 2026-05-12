import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';

// Import Route Files
import authRoutes from './routes/authRoutes.js';
import salesTeamRoutes from './routes/salesTeamRoutes.js';
import salesPersonRoutes from './routes/salesPersonRoutes.js';
import salesQuoteRoutes from './routes/salesQuoteRoutes.js';
import salesActivityRoutes from './routes/salesActivityRoutes.js';
import crmRoutes from './routes/crmRoutes.js';
import commissionRoutes from './routes/commissionRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import costingRoutes from './routes/costingRoutes.js';

// Import Middleware
import errorMiddleware from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Global Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Health Check Route
app.get('/health', (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TG Sales Ai API' });
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/sales-team', salesTeamRoutes);
app.use('/api/sales-person', salesPersonRoutes);
app.use('/api/sales-quote', salesQuoteRoutes);
app.use('/api/sales-activity', salesActivityRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/commission', commissionRoutes);
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/costing', costingRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

export default app;
