import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('--- Database Connection Test ---');
  console.log('URL:', supabaseUrl);
  
  if (supabaseKey.includes('YourSignatureHere')) {
    console.error('❌ ERROR: Your SUPABASE_ANON_KEY still has ".YourSignatureHere" at the end. This will NOT work.');
    return;
  }

  try {
    const { data, error } = await supabase.from('sales_team').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ CONNECTION FAILED:', error.message);
    } else {
      console.log('✅ CONNECTION SUCCESSFUL! Backend can talk to Supabase.');
    }
  } catch (err) {
    console.error('❌ UNEXPECTED ERROR:', err.message);
  }
}

testConnection();
