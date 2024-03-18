import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Editor.css'; // Import CSS file for styling

function Editor() {
  const [username, setUsername] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('');
  const [stdin, setStdin] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Code Language:", codeLanguage);
    try {
      await axios.post('http://localhost:3001/submit', {
        username,
        codeLanguage,
        stdin,
        sourceCode
      });
      setUsername('');
      setCodeLanguage('');
      setStdin('');
      setSourceCode('');
      navigate('/submissions');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="editor-container">
      <h1>Submission Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Code Language:</label>
          <select className="form-control" value={codeLanguage} onChange={(e) => setCodeLanguage(e.target.value)}>
            <option value="">Choose language</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div className="form-group">
          <label>Standard Input:</label>
          <input type="text" className="form-control" value={stdin} onChange={(e) => setStdin(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Source Code:</label>
          <textarea className="form-control code-editor" value={sourceCode} onChange={(e) => setSourceCode(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Editor;
