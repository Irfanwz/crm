import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 SUPABASE_URL:', supabaseUrl ? 'Found' : 'MISSING');

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL is missing in .env file");
}

// Regular operations client - using service key to bypass RLS for testing
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Admin operations client
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

console.log('✅ Supabase initialized with Service Key (RLS Bypassed)');