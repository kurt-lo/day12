import React, { useState } from 'react';
import './App.css';

function App() {
  // useState hook to manage the form data.
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    occupation: '',
    email: '',
    telNumber: ''
  });

  // useState hook to manage the form submission state.
  const [message, setMessage] = useState('');

  // Handles changes to form inputs and updates the state.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    try {
      // The fetch API is used to send a POST request to the Spring backend.
      const response = await fetch('http://localhost:8080/api/personal-details/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Details saved successfully!');
        // Clear the form after a successful submission.
        setFormData({
          firstName: '',
          lastName: '',
          middleName: '',
          occupation: '',
          email: '',
          telNumber: ''
        });
      } else {
        setMessage('Error saving details. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Network error. Could not connect to the server.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Details Form</h1>
        <form onSubmit={handleSubmit} className="personal-details-form">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Middle Name:</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Occupation:</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Telephone Number:</label>
            <input
              type="tel"
              name="telNumber"
              value={formData.telNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Save Details</button>
        </form>
        {message && <p className="message">{message}</p>}
      </header>
    </div>
  );
}

export default App;
