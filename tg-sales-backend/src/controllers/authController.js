import { supabase, supabaseAdmin } from '../config/supabase.js';

export const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Email, password and name are required' });
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,          // skip email verification for internal CRM
      user_metadata: { name, role: role || 'user' }
    });

    if (error) throw error;

    res.status(201).json({
      success: true,
      data: { user: { id: data.user.id, email: data.user.email, name, role: role || 'user' } }
    });
  } catch (error) {
    const status = error.message?.toLowerCase().includes('already registered') ? 409 : 400;
    res.status(status).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;

    // Fetch profile data
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('name, role, department, avatar_url')
      .eq('id', data.user.id)
      .single();

    res.status(200).json({
      success: true,
      data: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: profile?.name || data.user.user_metadata?.name || '',
          role: profile?.role || data.user.user_metadata?.role || 'user',
          department: profile?.department || null,
          avatar_url: profile?.avatar_url || null,
        }
      }
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({ success: false, message: 'Refresh token required' });
    }

    const { data, error } = await supabase.auth.refreshSession({ refresh_token });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      }
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Session expired, please log in again' });
  }
};

export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('name, role, department, avatar_url, is_active, created_at')
      .eq('id', req.user.id)
      .single();

    res.status(200).json({
      success: true,
      data: {
        id: req.user.id,
        email: req.user.email,
        name: profile?.name || req.user.user_metadata?.name || '',
        role: profile?.role || req.user.user_metadata?.role || 'user',
        department: profile?.department || null,
        avatar_url: profile?.avatar_url || null,
        is_active: profile?.is_active ?? true,
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
