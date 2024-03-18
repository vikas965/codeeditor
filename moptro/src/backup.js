import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/submissions');
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const truncateSourceCode = (sourceCode) => {
    if (sourceCode && sourceCode.length > 100) {
      return sourceCode.substring(0, 100) + '...';
    }
    return sourceCode;
  };
  console.log(submissions);

  return (
    <div className="container mt-5">
      <h2>Submissions</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Code Language</th>
            <th>Stdin</th>
            <th>Source Code (Short)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.username}</td>
              <td>{submission.code_language}</td>
              <td>{submission.stdin}</td>
              <td>{truncateSourceCode(submission.source_code_short)}</td>
              <td>{submission.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;
