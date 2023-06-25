import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import GreyDashboard from './components/GreyDashboard';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          

          {/* A <Routes> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/greydashboard" element={<GreyDashboard />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<App />);
