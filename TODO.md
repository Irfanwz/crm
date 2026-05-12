# CRM Project — Fix List
> Generated: 2026-05-08 | Stack: React 19 + Express 5 + Supabase

---

## PHASE 1 — CRITICAL (App is broken without these)

### 1. Fix Login — it does nothing
**File:** `frontend/src/components/pages/auth/Login.jsx` — lines 15–19

**Problem:** `handleSubmit` only calls `navigate('/dashboard')`. The `authService.login()` function already exists and is correct — it just never gets called. Email/password are collected but thrown away.

**Fix:**
- Import `authService` from `../../../services/authService`
- Import `setAccessToken` from `../../../services/api`
- Add `loading` and `error` state
- In `handleSubmit`:
  1. Call `authService.login(formData.email, formData.password)`
  2. On success → call `setAccessToken(res.data.data.token)` then `navigate('/dashboard')`
  3. On failure → set error state and show message in the form

---

### 2. Add protected routes in App.jsx
**File:** `frontend/src/App.jsx` — line 232

**Problem:** `<Route path="/*" element={<AppShell />} />` has no auth guard. Anyone who types `/dashboard` in the browser goes straight in — no token required. The `/login` route exists but nothing redirects unauthenticated users to it.

**Fix:**
- Create a `PrivateRoute` component that checks `getAccessToken()` from `api.js`
- If no token → `<Navigate to="/login" replace />`
- Wrap the `<AppShell />` route with it:
  ```jsx
  <Route path="/*" element={<PrivateRoute><AppShell /></PrivateRoute>} />
  ```
- Also add: if user is already logged in and visits `/login` → redirect to `/dashboard`

---

### 3. Create `/api/auth/refresh` endpoint
**File:** `tg-sales-backend/src/routes/authRoutes.js` — add after line 10
**File:** `tg-sales-backend/src/controllers/authController.js` — add new export

**Problem:** `frontend/src/services/api.js` line 32 calls `POST /api/auth/refresh` on every 401 response. This endpoint does not exist in the backend. Every token expiry will silently fail and users get logged out.

**Fix — controller** (`authController.js`):
```js
export const refresh = async (req, res) => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    res.status(200).json({
      success: true,
      data: { access_token: data.session.access_token }
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Session expired' });
  }
};
```
**Fix — route** (`authRoutes.js`):
```js
import { register, login, logout, getMe, refresh } from '../controllers/authController.js';
router.post('/refresh', refresh);
```

---

### 4. Fix `baseRoutes.js` — wrong module syntax (or delete it)
**File:** `tg-sales-backend/src/routes/baseRoutes.js` — lines 1–16

**Problem:** This file uses `require()` and `module.exports` (CommonJS) while the entire backend uses ES Modules (`import`/`export`). The `package.json` has `"type": "module"` which means `require()` will throw a runtime error if this file is ever loaded.

**Check first:** `baseRoutes.js` is NOT imported anywhere in `app.js`. It appears to be dead code.

**Fix:** Delete the file. If it was intended to be a reusable router factory, rewrite it with ES module syntax:
```js
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

const createRouter = (controller) => {
  const router = express.Router();
  router.get('/', authMiddleware, controller.getAll);
  router.get('/:id', authMiddleware, controller.getById);
  router.post('/', authMiddleware, controller.create);
  router.put('/:id', authMiddleware, controller.update);
  router.delete('/:id', authMiddleware, controller.remove);
  return router;
};

export default createRouter;
```

---

## PHASE 2 — SECURITY

### 5. Clean up backend `.env`
**File:** `tg-sales-backend/.env`

**Problems:**
| Line | Variable | Issue |
|------|----------|-------|
| 1 | `VITE_API_BASE_URL` | `VITE_` prefix is for Vite/frontend — wrong file, never read by backend |
| 4 | `JWT_SECRET=your_jwt_secret_here` | Placeholder never changed — though app uses Supabase auth so may be unused; confirm and remove if so |
| 5–7 | `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME` | Plain-text credentials committed to the file; not used anywhere in code |

**Fix:** Remove lines 1, 5, 6, 7. Either set a real `JWT_SECRET` or remove line 4 if it's unused.

---

### 6. Fix Supabase client — stop bypassing RLS
**File:** `tg-sales-backend/src/config/supabase.js` — lines 22–25

**Problem:** Both `supabase` (used for normal queries) and `supabaseAdmin` (used for auth verification) are created with the **service role key**. The service role key bypasses Row Level Security completely — any user who gets past the auth check can read/write everyone's data.

**Current (wrong):**
```js
export const supabase = createClient(supabaseUrl, supabaseServiceKey);      // RLS bypassed
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey); // OK for admin
```

**Fix:**
```js
// Normal queries — respects RLS
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin-only operations (token verification, user management) — bypasses RLS intentionally
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
```

Also remove the misleading `console.log` on line 27.

> **Note:** After switching `supabase` to anon key, you will need to configure RLS policies in Supabase dashboard for `sales_quote`, `sales_team`, `sales_person`, etc. tables, or queries will return empty results.

---

### 7. Fix auth error responses — missing `success` field
**File:** `tg-sales-backend/src/middleware/authMiddleware.js` — lines 9, 15

**Problem:** Auth middleware returns `{ message: '...' }` while every other part of the API returns `{ success: false, message: '...' }`. Frontend checks `res.data.success` in several places and this inconsistency will cause silent failures.

**Fix:**
```js
return res.status(401).json({ success: false, message: 'No token provided' });
// and
return res.status(401).json({ success: false, message: 'Invalid or expired token' });
```

---

## PHASE 3 — REPLACE HARDCODED DATA

### 8. Sales Funnel chart — fetch real data
**File:** `frontend/src/components/pages/sales/index.jsx` — lines 107–113

**Problem:** `FUNNEL_DATA` is a hardcoded constant. The funnel chart always shows 500 → 280 → 140 → 62 → 28 regardless of actual deal data.

**Fix:** Replace `FUNNEL_DATA` constant with computed data derived from the `deals` state that's already fetched:
```js
const funnelData = [
  { id: 'leads',       value: deals.length,                                         label: 'All Deals' },
  { id: 'qualified',   value: deals.filter(d => d.stage !== 'Discovery').length,    label: 'Qualified' },
  { id: 'proposal',    value: deals.filter(d => ['Proposal','Negotiation','Closed Won'].includes(d.stage)).length, label: 'Proposal' },
  { id: 'negotiation', value: deals.filter(d => ['Negotiation','Closed Won'].includes(d.stage)).length, label: 'Negotiation' },
  { id: 'won',         value: deals.filter(d => d.stage === 'Closed Won').length,   label: 'Closed Won' },
]
```
Pass `funnelData` to `<CustomFunnelChart data={funnelData} ... />`

---

### 9. Sales Activities tab — fetch real data
**File:** `frontend/src/components/pages/sales/index.jsx` — lines 498–502

**Problem:** The "Sales activities" tab shows 3 hardcoded activities (Nexus Corp call, Skyline Ltd meeting, Innovate AI email). These are never real.

**Fix:**
- Add `activities` state: `const [activities, setActivities] = useState([])`
- In `fetchSalesData()`, also call `salesService.getActivities()` and set state
- Render from state instead of the hardcoded array
- Show empty state if no activities

---

### 10. Sales Training tab — fetch real data
**File:** `frontend/src/components/pages/sales/index.jsx` — lines 466–468

**Problem:** 3 hardcoded training courses. Not connected to any backend endpoint.

**Fix (short-term):** Either fetch from an API or clearly mark as placeholder with a "Coming Soon" state. Do not leave silently fake data.

---

### 11. Stat card trend percentages are hardcoded
**File:** `frontend/src/components/pages/sales/index.jsx` — lines 268–271

**Problem:** `+12%`, `+18.4%`, `+24.1%`, `+5%` are hardcoded fake trends shown as real data.

**Fix:** Either remove the trend badges until real comparison logic exists, or calculate from actual data (compare current period vs previous period).

---

## PHASE 4 — CODE QUALITY

### 12. Add input validation to `salesQuoteController.create`
**File:** `tg-sales-backend/src/controllers/salesQuoteController.js` — line 33

**Problem:** `express-validator` is in `package.json` but used nowhere. The `create()` function inserts whatever it receives into the DB — no required field checks, no type validation, no sanitization.

**Fix — add validation middleware to route:**
```js
// salesQuoteRoutes.js
import { body, validationResult } from 'express-validator';

const quoteValidation = [
  body('client_name').notEmpty().trim().withMessage('Client name is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('status').isIn(['Discovery','Qualified','Proposal','Negotiation','Closed Won','Closed Lost'])
                .withMessage('Invalid status value'),
];

router.post('/', authMiddleware, quoteValidation, salesQuoteController.create);
```

**Fix — check result at top of `create()`:**
```js
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(422).json({ success: false, errors: errors.array() });
}
```

---

### 13. Add error state to Login form
**File:** `frontend/src/components/pages/auth/Login.jsx`

**Problem:** No loading spinner while submitting, no way to show the user why login failed (wrong password, network error, etc.).

**Fix:** Add `loading` and `error` state:
```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```
- Disable the submit button and show a spinner when `loading === true`
- Show `error` message below the form if set
- Clear `error` when the user starts typing again

---

### 14. Standardize error response in `authController`
**File:** `tg-sales-backend/src/controllers/authController.js` — lines 14–24

**Problem:** `register` catches errors and returns HTTP 400 for everything including Supabase-specific errors (e.g., "User already registered"). Should return 409 for duplicate users.

**Fix:**
```js
} catch (error) {
  const status = error.message?.includes('already registered') ? 409 : 400;
  res.status(status).json({ success: false, message: error.message });
}
```

---

## SUMMARY TABLE

| # | File | Severity | Type |
|---|------|----------|------|
| 1 | `frontend/.../auth/Login.jsx:15` | CRITICAL | Login does nothing |
| 2 | `frontend/src/App.jsx:232` | CRITICAL | No auth guard on routes |
| 3 | `tg-sales-backend/src/routes/authRoutes.js` | CRITICAL | Missing `/refresh` endpoint |
| 4 | `tg-sales-backend/src/routes/baseRoutes.js` | HIGH | CommonJS in ES Module project |
| 5 | `tg-sales-backend/.env` | HIGH | Exposed credentials, wrong vars |
| 6 | `tg-sales-backend/src/config/supabase.js:22` | HIGH | RLS bypassed for all queries |
| 7 | `tg-sales-backend/src/middleware/authMiddleware.js:9` | MEDIUM | Inconsistent error format |
| 8 | `frontend/.../sales/index.jsx:107` | MEDIUM | Hardcoded funnel data |
| 9 | `frontend/.../sales/index.jsx:498` | MEDIUM | Hardcoded activities |
| 10 | `frontend/.../sales/index.jsx:466` | LOW | Hardcoded training courses |
| 11 | `frontend/.../sales/index.jsx:268` | LOW | Fake trend percentages |
| 12 | `tg-sales-backend/.../salesQuoteController.js:33` | MEDIUM | No input validation |
| 13 | `frontend/.../auth/Login.jsx` | MEDIUM | No loading/error UI |
| 14 | `tg-sales-backend/.../authController.js:22` | LOW | Non-specific error codes |

---

## HOW TO RUN THE PROJECT

**Backend:**
```bash
cd tg-sales-backend
npm install
npm run dev        # nodemon — port 5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev        # Vite — port 5173
```

**Connection check:**
- Backend health: `http://localhost:5000/health` → should return `{ success: true }`
- Frontend hits: `http://localhost:5000/api` via `VITE_API_URL` in `frontend/.env`
- CORS: backend allows `http://localhost:5173` via `CLIENT_ORIGIN` in `tg-sales-backend/.env`
