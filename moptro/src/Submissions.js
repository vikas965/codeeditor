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

  const fetchStdout = async (submissionId) => {
    try {
      const submission = submissions[submissionId];
      const requestData = {
        source_code: submission.source_code,
        language_id: getLanguageId(submission.code_language),
        stdin: submission.stdin
      };

      const config = {
        headers: {
          'X-Auth-Token': '150023bfa3msh47155ee1eba08f2p1ab268jsneeae2d2568e3',
          'X-Auth-User': 'YOUR_AUTHORIZATION_TOKEN'
        }
      };

      const response = await axios.post('https://ce.judge0.com/submissions', requestData, config);

      // Update submissions state with the stdout received from Judge0
      setSubmissions(prevSubmissions => {
        const updatedSubmissions = [...prevSubmissions];
        updatedSubmissions[submissionId].stdout = response.data.stdout;
        return updatedSubmissions;
      });
    } catch (error) {
      console.error('Error fetching stdout from Judge0:', error);
    }
  };

  const getLanguageId = (codeLanguage) => {
    const languageIds = {
      'Assembly (NASM 2.14.02)': 45,
      'Bash (5.0.0)': 46,
      'Basic (FBC 1.07.1)': 47,
      'C (GCC 7.4.0)': 48,
      'C++ (GCC 7.4.0)': 52,
      'C (GCC 8.3.0)': 49,
      'C++ (GCC 8.3.0)': 53,
      'C (GCC 9.2.0)': 50,
      'C++ (GCC 9.2.0)': 54,
      'C# (Mono 6.6.0.161)': 51,
      'Common Lisp (SBCL 2.0.0)': 55,
      'D (DMD 2.089.1)': 56,
      'Elixir (1.9.4)': 57,
      'Erlang (OTP 22.2)': 58,
      'Executable': 44,
      'Fortran (GFortran 9.2.0)': 59,
      'Go (1.13.5)': 60,
      'Haskell (GHC 8.8.1)': 61,
      'Java (OpenJDK 13.0.1)': 62,
      'JavaScript (Node.js 12.14.0)': 63,
      'Lua (5.3.5)': 64,
      'OCaml (4.09.0)': 65,
      'Octave (5.1.0)': 66,
      'Pascal (FPC 3.0.4)': 67,
      'PHP (7.4.1)': 68,
      'Plain Text': 43,
      'Prolog (GNU Prolog 1.4.5)': 69,
      'Python (2.7.17)': 70,
      'Python (3.8.1)': 71,
      'Ruby (2.7.0)': 72,
      'Rust (1.40.0)': 73,
      'TypeScript (3.7.4)': 74
    };

    return languageIds[codeLanguage];
  };

  useEffect(() => {
    submissions.forEach((_, index) => fetchStdout(index));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissions]);

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
            <th>Stdout</th>
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
              <td>{submission.stdout || 'Fetching stdout...'}</td>
              <td>{submission.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;
