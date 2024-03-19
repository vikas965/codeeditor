import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
const app = express();
const port = 3001;

// MySQL connection setup
const connection = mysql.createConnection({
   host: '103.21.58.5',
  user: 'stepcone2024',
  password: 'Curie@1867',
  database: 'stepcone'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit', (req, res) => {
  const { username, codeLanguage, stdin, sourceCode } = req.body;
  const timestamp = new Date().toISOString();

  const submission = {
    username,
    code_language: codeLanguage,
    stdin,
    source_code: sourceCode,
    timestamp
  };

  connection.query('INSERT INTO submissions SET ?', submission, (err, result) => {
    if (err) {
      console.error('Error submitting entry to MySQL: ' + err.stack);
      res.status(500).send('Error submitting entry');
      return;
    }
    console.log('Entry submitted:', result.insertId);
    res.status(200).send('Entry submitted successfully');
  });
});

// Route to retrieve submissions
app.get('/submissions', (req, res) => {
  connection.query('SELECT username, code_language, stdin, LEFT(source_code, 100) AS source_code_short, timestamp FROM submissions', (err, rows) => {
    if (err) {
      console.error('Error retrieving entries from MySQL: ' + err.stack);
      res.status(500).send('Error retrieving entries');
      return;
    }
    res.status(200).json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
