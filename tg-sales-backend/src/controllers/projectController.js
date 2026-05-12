import { supabase } from '../config/supabase.js';

export const getAll = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('project')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in project.getAll:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('project')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in project.getById:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    // We log the body to help diagnose frontend/backend mismatch
    console.log('Incoming project data:', req.body);

    const { 
      name, 
      client_name, 
      clientName, 
      status, 
      start_date, 
      startDate, 
      end_date, 
      endDate 
    } = req.body;

    // Support both snake_case and camelCase from frontend
    const insertData = {
      name,
      client_name: client_name || clientName,
      status: status || 'Planning',
      start_date: start_date || startDate,
      end_date: end_date || endDate
    };

    // Remove undefined fields
    Object.keys(insertData).forEach(key => insertData[key] === undefined && delete insertData[key]);

    const { data, error } = await supabase
      .from('project')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Supabase Error (project.create):', error.message);
      throw error;
    }

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Error in project.create:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { data, error } = await supabase
      .from('project')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in project.update:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('project')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error('Error in project.deleteOne:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
