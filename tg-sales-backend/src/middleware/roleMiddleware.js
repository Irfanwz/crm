import { supabaseAdmin } from '../config/supabase.js';

// ── Role hierarchy ────────────────────────────────────────────
//   admin  → full access
//   sales  → sales + CRM operations
//   user   → read-only, own data only
// ─────────────────────────────────────────────────────────────

// Usage in routes:
//   router.delete('/:id', authMiddleware, requireRole('admin'), controller.remove)
//   router.post('/', authMiddleware, requireRole('admin', 'sales'), controller.create)

export const requireRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
      }

      // Fetch role from profiles table
      const { data: profile, error } = await supabaseAdmin
        .from('profiles')
        .select('role, is_active')
        .eq('id', req.user.id)
        .single();

      if (error || !profile) {
        return res.status(403).json({ success: false, message: 'User profile not found' });
      }

      if (!profile.is_active) {
        return res.status(403).json({ success: false, message: 'Account is deactivated' });
      }

      if (!allowedRoles.includes(profile.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${allowedRoles.join(' or ')}`
        });
      }

      // Attach role to request for downstream use
      req.user.role = profile.role;
      next();
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Role check failed' });
    }
  };
};

// Shorthand guards
export const adminOnly  = requireRole('admin');
export const salesOrAdmin = requireRole('admin', 'sales');
export const anyRole    = requireRole('admin', 'sales', 'user');
