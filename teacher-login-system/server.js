const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const supabase = require('./supabaseClient');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

const users = [
  { username: 'teacher1', password: 'password1' },
  { username: 'teacher2', password: 'password2' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    req.session.user = user;
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

app.get('/data', async (req, res) => {
  const { data, error } = await supabase
    .from('student_results')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.get('/api/data', (req, res) => {
  const data = { message: 'Hello, Supabase!' };
  res.json(data);
});

app.get('/api/marks', async (req, res) => {
  console.log('Session:', req.session);
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const studentId = req.query.studentId;
  if (!studentId) {
    return res.status(400).json({ message: 'Student ID is required' });
  }

  console.log(`Querying Supabase for student results with ID: ${studentId}`);
  const { data, error } = await supabase
    .from('student_results')
    .select('*')
    .eq('student_id', studentId);

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }

  console.log('Supabase data:', data);

  if (!data || data.length === 0) {
    console.error('No data returned from Supabase');
    return res.status(500).json({ error: 'No data returned from Supabase' });
  }

  // Calculate overall class percentage
  const totalMarks = data.reduce((sum, mark) => sum + mark.marks, 0);
  const maxMarks = data.length * 100; // Assuming each subject is out of 100
  const overallPercentage = (totalMarks / maxMarks) * 100;

  res.json({ data, overallPercentage });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
