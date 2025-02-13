import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import seedRoute from './routes/seedRoute';

const MONGO_URI = process.env.MONGO_URI;
mongoose.set('strictQuery', true);
mongoose
  .connect(MONGO_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('MongoDB Connection Failed'));

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/seed', seedRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
