import { supabase } from '../config/supabase.js';

export const getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('inquiry')
      .select('*, sales_person(*)')
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
      .from('inquiry')
      .select('*, sales_person(*)')
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
    const { client_name, contact_info, message, sales_person_id } = req.body;
    const { data, error } = await supabase
      .from('inquiry')
      .insert({ 
        client_name, 
        contact_info, 
        message, 
        sales_person_id,
        status: 'NEW' 
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const recordInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('inquiry')
      .update({ status: 'RECORDED' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const respondToInquiry = async (req, res) => {
  try {
    const { id, response_notes } = req.body;
    const { data, error } = await supabase
      .from('inquiry')
      .update({ 
        status: 'RESPONDED', 
        response_notes 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const setFollowUp = async (req, res) => {
  try {
    const { id, follow_up_date } = req.body;
    const { data, error } = await supabase
      .from('inquiry')
      .update({ 
        status: 'FOLLOWUP', 
        follow_up_date 
      })
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
      .from('inquiry')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
