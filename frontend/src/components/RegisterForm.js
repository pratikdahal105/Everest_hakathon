import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/mutations';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Add phoneNumber state
  const [register, { data }] = useMutation(REGISTER);

  const submitForm = (e) => {
    e.preventDefault();
    register({ variables: { username: username, password: password, phone_number: phoneNumber } }); // Include phone_number in variables
  };

  return (
    <form onSubmit={submitForm}>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} /> {/* Add phone number input */}
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
