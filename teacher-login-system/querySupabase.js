const supabase = require('./supabaseClient');

async function fetchData() {
  // Example query to fetch data from a table
  const { data, error } = await supabase
    .from('student_results')
    .select('*');

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  console.log('Data:', data);
}

fetchData();
