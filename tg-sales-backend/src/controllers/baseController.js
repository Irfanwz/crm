import { supabase } from '../config/supabase.js';

export const getAll = (tableName) => async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getById = (tableName) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const create = (tableName) => async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert([req.body])
      .select();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const update = (tableName) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from(tableName)
      .update(req.body)
      .eq('id', id)
      .select();

    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const remove = (tableName) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
