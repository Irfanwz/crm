-- ============================================================
-- RUN THIS IN: Supabase Dashboard → SQL Editor → New Query
-- ============================================================
--
-- HOW PASSWORDS WORK:
--   Supabase has a built-in "auth.users" table that stores
--   email + hashed password. You never store passwords yourself.
--   The "profiles" table just adds name, role, etc. on top.
--
-- 3 ROLES:
--   admin  → full access to everything + user management
--   sales  → sales, CRM, projects, marketing, meetings, documents
--   user   → read-only access to their own data + training + portal
-- ============================================================


-- ── 1. PROFILES TABLE ────────────────────────────────────────
--    Links to auth.users via id (same UUID)
--    Password is in auth.users — NOT here
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL DEFAULT '',
  role        TEXT        NOT NULL DEFAULT 'user'
                CHECK (role IN ('admin', 'sales', 'user')),
  department  TEXT,
  avatar_url  TEXT,
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ── 2. AUTO-CREATE PROFILE ON SIGNUP ────────────────────────
--    When Supabase Auth creates a user, this trigger
--    automatically inserts a matching row in profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ── 3. AUTO-UPDATE updated_at ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


-- ── 4. ROW LEVEL SECURITY ─────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can see their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (not their role)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

-- Admins can see ALL profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update ALL profiles (including role changes)
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Service role (backend) bypasses RLS entirely — this is fine
-- because our backend uses the service key only for server-side ops


-- ── 5. SEED FIRST ADMIN USER ─────────────────────────────────
--    After running this SQL, go to:
--    Supabase Dashboard → Authentication → Users → Add User
--    Email:    admin@timeglobal.com
--    Password: (choose a strong password)
--    Then run this UPDATE to make them admin:
--
--    UPDATE public.profiles
--    SET role = 'admin', name = 'Admin'
--    WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@timeglobal.com');


-- ── 6. VERIFY SETUP ──────────────────────────────────────────
SELECT
  'profiles table ready' AS status,
  count(*) AS existing_profiles
FROM public.profiles;

-- Show role distribution
SELECT role, count(*) FROM public.profiles GROUP BY role;
