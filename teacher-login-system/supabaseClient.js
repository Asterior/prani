const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qcatxgepwvwmlxuacuks.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjYXR4Z2Vwd3Z3bWx4dWFjdWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyODg5NzcsImV4cCI6MjA1NTg2NDk3N30.W-VoyyJPVkUdEhnMmnNYlx0v7O85Sg9h3Z9RQsDCa9o';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
