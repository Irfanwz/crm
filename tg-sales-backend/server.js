import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.API_PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 TG Sales AI Backend running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🔗 Supabase URL: ${process.env.SUPABASE_URL}`);
});
