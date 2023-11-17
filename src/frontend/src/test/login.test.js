import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/Login/Login'; // replace with the actual path to your Login.js file

describe('Login Component', () => {
  it('renders login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    expect(passwordInput).toBeInTheDocument();
    
    const loginButton = screen.getByRole('button', { name: /Log in/i });
    expect(loginButton).toBeInTheDocument();
  });
});

