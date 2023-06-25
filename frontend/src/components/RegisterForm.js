import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/mutations';
import "bootstrap/dist/css/bootstrap.min.css";

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [register, { data, error }] = useMutation(REGISTER);

  const submitForm = (e) => {
    e.preventDefault();
    register({
      variables: { username: username, password: password, phone_number: phoneNumber },
    });
  };

  if (error) {
    window.location.href = 'http://localhost:5000/signInWC';
  }

  return (
    <div className="container-fluid bg-primary d-flex justify-content-center align-items-center vh-100">
      <div className="col-lg-9 col-xl-7">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title mb-4 text-center">Register</h2>
            <form onSubmit={submitForm}>
              <div className="h5" style={{ height: "50px" }}>
                User Information
              </div>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="firstName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="lastName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="confirmPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number:
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
