import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import { connect } from 'mongoose';
import noteRouter from './routers/noteRouter.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;



app.use(cors(
  {
    origin: process.env.FRONTEND_URL,
  }
));
app.use(express.json());
app.use(rateLimiter);
app.use('/api/notes', noteRouter);

connectDB().then(() => {
  app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  });
});




