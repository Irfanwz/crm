
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTable() {
  console.log('Checking sales_quote table...');
  
  // 1. Try to insert with object in activities
  console.log('Testing JSON activities insert...');
  const { data: insertData, error: insertError } = await supabase
    .from('sales_quote')
    .insert([{ 
      client_name: 'Test JSON', 
      amount: 500, 
      status: 'Proposal',
      activities: [{ type: 'note', text: 'Test note' }] // Testing if it accepts array/object
    }])
    .select();
  
  if (insertError) {
    console.error('Insert error for JSON activities:', insertError);
  } else {
    console.log('Successfully inserted record with JSON activities:', insertData);
  }

  // 2. Try to insert with ALL columns to confirm they are missing
  console.log('Testing full columns insert...');
  const { error: fullError } = await supabase
    .from('sales_quote')
    .insert([{ 
      client_name: 'Test Full', 
      amount: 1000, 
      status: 'Discovery',
      contact_person: 'John Doe',
      probability: 50,
      close_date: new Date().toISOString()
    }])
    .select();
  
  if (fullError) {
    console.log('Confirmed: Columns are missing. Error:', fullError.message);
  } else {
    console.log('Wait, columns are NOT missing?!');
  }
}

checkTable();
