import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const USER_LOGIN = gql`
  mutation UserLogin($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      success
      message
      user {
        username
      }
    }
  }
`;

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { loading, error, data }] = useMutation(USER_LOGIN);

  const submitForm = async (e) => {
    e.preventDefault();

    // Trigger the mutation here
    await loginUser({ variables: { username, password } });

    setUsername('');
    setPassword('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <form onSubmit={submitForm}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {data && (
        data.userLogin.success ? 
          <p>Logged in as {data.userLogin.user.username}</p> : 
          <p>{data.userLogin.message}</p>
      )}
    </form>
  );
}

export default LoginForm;
