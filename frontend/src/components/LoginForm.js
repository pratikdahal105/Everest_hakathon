import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  

  const [loginUser, { loading, error, data }] = useMutation(USER_LOGIN);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger the mutation here
    await loginUser({ variables: { username, password } });

    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    if (data && data.userLogin.success) {
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = 'http://localhost:5000/signInWC';
      }, 5000);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container-fluid bg-primary vh-100 d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Login</h3>
          {redirecting ? (
            <p>Redirecting to World ID sign in...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Link to="#" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          )}
          <div>
            Or
            <div>
              Login with{' '}
              <a href="http://localhost:5000/signInWC" className="text-decoration-none">
                World Coin
              </a>
            </div>
          </div>
          <hr />
          <div className="mt-3">
            Don't have an account?{' '}
            <Link to="/register" className="text-decoration-none">
              Register
            </Link>
          </div>
          {data && (
            data.userLogin.success ? (
              <p>Logged in as {data.userLogin.user.username}</p>
            ) : (
              <p>{data.userLogin.message}</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
