/**
 * Seed script: Pushes content to Supabase as authenticated admin.
 * 
 * Usage: node scripts/seed-supabase.cjs
 * 
 * This logs in as admin, then upserts the content into site_content table,
 * bypassing RLS by being an authenticated admin user.
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ezofzdogkfecmcwsqebn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6b2Z6ZG9na2ZlY21jd3NxZWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MzQ5MzUsImV4cCI6MjA4MjQxMDkzNX0.Af7y62XuJpiAe7hpbifHEesE16eaCMgQYtm3xOnUFKA';

const CONTENT_KEY = 'flexiaura_content_v1';

// Default content to seed — update this with your actual content
const contentToSeed = {
  heroTitle: "",
  heroSubtitle: "",
  contactInfo: "",
  videos: []
};

async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Get admin credentials from command line args or prompt
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Usage: node scripts/seed-supabase.cjs <admin-email> <admin-password>');
    console.error('Example: node scripts/seed-supabase.cjs admin@example.com mypassword');
    process.exit(1);
  }

  console.log(`[Seed] Logging in as ${email}...`);
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });

  if (authError) {
    console.error('[Seed] Login failed:', authError.message);
    process.exit(1);
  }

  console.log('[Seed] Logged in successfully as:', authData.user.email);

  // First check what's already in the table
  const { data: existing, error: readError } = await supabase
    .from('site_content')
    .select('*')
    .eq('key', CONTENT_KEY)
    .single();

  if (readError && readError.code !== 'PGRST116') {
    console.error('[Seed] Read error:', readError);
  }

  if (existing) {
    console.log('[Seed] Existing content found:', JSON.stringify(existing.value, null, 2));
    console.log('[Seed] Skipping seed — data already exists. Delete the row first if you want to re-seed.');
  } else {
    console.log('[Seed] No existing content. Inserting seed data...');
    const { data, error } = await supabase
      .from('site_content')
      .upsert({
        key: CONTENT_KEY,
        value: contentToSeed,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' })
      .select();

    if (error) {
      console.error('[Seed] Insert error:', error);
    } else {
      console.log('[Seed] Successfully seeded content:', JSON.stringify(data, null, 2));
    }
  }

  await supabase.auth.signOut();
  console.log('[Seed] Done.');
}

main().catch(err => {
  console.error('[Seed] Fatal error:', err);
  process.exit(1);
});
