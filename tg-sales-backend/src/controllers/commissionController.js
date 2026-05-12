import { supabase } from '../config/supabase.js';

export const getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('commission')
      .select('*, sales_person(*), crm(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('commission')
      .select('*, sales_person(*), crm(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { sales_person_id, crm_id, amount, percentage } = req.body;
    const calculatedAmount = (amount * percentage) / 100;

    const { data, error } = await supabase
      .from('commission')
      .insert({ 
        sales_person_id, 
        crm_id, 
        amount, 
        percentage, 
        calculated_amount: calculatedAmount,
        status: 'PENDING' 
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getBySalesPerson = async (req, res) => {
  try {
    const { salesperson_id } = req.params;
    const { data, error } = await supabase
      .from('commission')
      .select('*, sales_person(*), crm(*)')
      .eq('sales_person_id', salesperson_id);

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const { data, error } = await supabase
      .from('commission')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('commission')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
