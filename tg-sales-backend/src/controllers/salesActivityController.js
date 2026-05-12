import { supabase } from '../config/supabase.js';

export const getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('sales_activity')
      .select('*, sales_person(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in salesActivity.getAll:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('sales_activity')
      .select('*, sales_person(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in salesActivity.getById:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    console.log('Incoming sales activity data:', req.body);
    
    const { 
      sales_person_id, 
      salesPersonId, 
      type, 
      description, 
      date, 
      outcome 
    } = req.body;

    const insertData = {
      sales_person_id: sales_person_id || salesPersonId,
      type,
      description,
      date: date || new Date().toISOString(),
      outcome
    };

    // Remove undefined fields
    Object.keys(insertData).forEach(key => insertData[key] === undefined && delete insertData[key]);

    const { data, error } = await supabase
      .from('sales_activity')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Supabase Error (salesActivity.create):', error.message);
      throw error;
    }
    
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Error in salesActivity.create:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { data, error } = await supabase
      .from('sales_activity')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in salesActivity.update:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('sales_activity')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error('Error in salesActivity.deleteOne:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
