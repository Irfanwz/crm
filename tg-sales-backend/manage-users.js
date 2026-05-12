/**
 * User Management CLI
 *
 * Usage:
 *   node manage-users.js list                              — List all users
 *   node manage-users.js create <email> <password> <name> [role]  — Create a user (role: admin|sales|user, default: user)
 *   node manage-users.js reset-password <email> <newPassword>     — Reset a user's password
 *   node manage-users.js delete <email>                           — Delete a user
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const VALID_ROLES = ['admin', 'sales', 'user'];

// ── Helpers ──────────────────────────────────────────────────
async function listUsers() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) { console.error('Error:', error.message); return; }

  const { data: profiles } = await supabase.from('profiles').select('*');
  const profileMap = Object.fromEntries((profiles || []).map(p => [p.id, p]));

  console.log(`\n  Found ${data.users.length} user(s):\n`);
  console.log(`  ${'ID'.padEnd(38)} ${'Email'.padEnd(28)} ${'Role'.padEnd(8)} ${'Active'.padEnd(10)} Name`);
  console.log('  ' + '-'.repeat(95));

  for (const u of data.users) {
    const p = profileMap[u.id];
    console.log(
      `  ${u.id}  ${(u.email || '').padEnd(28)} ${(p?.role || 'user').padEnd(8)} ${(p?.is_active ? 'yes' : 'no').padEnd(10)} ${p?.name || u.user_metadata?.name || '-'}`
    );
  }
  console.log();
}

async function createUser(email, password, name, role = 'user') {
  if (!email || !password || !name) {
    console.error('Usage: node manage-users.js create <email> <password> <name> [role]');
    process.exit(1);
  }
  if (!VALID_ROLES.includes(role)) {
    console.error(`Invalid role "${role}". Must be one of: ${VALID_ROLES.join(', ')}`);
    process.exit(1);
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role },
  });

  if (error) {
    console.error('Failed to create user:', error.message);
    process.exit(1);
  }

  // The trigger in setup_auth.sql auto-creates the profile row.
  // But if the trigger didn't fire (e.g., not set up yet), upsert it manually.
  await supabase.from('profiles').upsert({
    id: data.user.id,
    name,
    role,
  }, { onConflict: 'id' });

  console.log(`\n  User created successfully!`);
  console.log(`  Email:    ${email}`);
  console.log(`  Name:     ${name}`);
  console.log(`  Role:     ${role}`);
  console.log(`  ID:       ${data.user.id}\n`);
}

async function resetPassword(email, newPassword) {
  if (!email || !newPassword) {
    console.error('Usage: node manage-users.js reset-password <email> <newPassword>');
    process.exit(1);
  }

  // Find user by email
  const { data: users, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) { console.error('Error:', listErr.message); process.exit(1); }

  const user = users.users.find(u => u.email === email);
  if (!user) { console.error(`No user found with email: ${email}`); process.exit(1); }

  const { error } = await supabase.auth.admin.updateUserById(user.id, { password: newPassword });
  if (error) { console.error('Failed:', error.message); process.exit(1); }

  console.log(`\n  Password reset for ${email}\n`);
}

async function deleteUser(email) {
  if (!email) {
    console.error('Usage: node manage-users.js delete <email>');
    process.exit(1);
  }

  const { data: users, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) { console.error('Error:', listErr.message); process.exit(1); }

  const user = users.users.find(u => u.email === email);
  if (!user) { console.error(`No user found with email: ${email}`); process.exit(1); }

  const { error } = await supabase.auth.admin.deleteUser(user.id);
  if (error) { console.error('Failed:', error.message); process.exit(1); }

  console.log(`\n  Deleted user: ${email} (${user.id})\n`);
}

// ── CLI entry point ──────────────────────────────────────────
const [,, command, ...args] = process.argv;

switch (command) {
  case 'list':
    await listUsers();
    break;
  case 'create':
    await createUser(args[0], args[1], args[2], args[3]);
    break;
  case 'reset-password':
    await resetPassword(args[0], args[1]);
    break;
  case 'delete':
    await deleteUser(args[0]);
    break;
  default:
    console.log(`
  User Management CLI

  Commands:
    list                                     List all users
    create <email> <password> <name> [role]  Create user (role: admin|sales|user)
    reset-password <email> <newPassword>     Reset password
    delete <email>                           Delete user
    `);
}
