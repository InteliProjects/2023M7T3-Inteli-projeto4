import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import AccessRequestCard from '../pages/request_acess/request'; // replace with the actual path to your AccessRequestCard.js file

describe('AccessRequestCard Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <AccessRequestCard />
      </Router>
    );
    expect(screen.getByText(/Request Access/i)).toBeInTheDocument();
  });

  it('displays form fields', () => {
    render(
      <Router>
        <AccessRequestCard />
      </Router>
    );
    expect(screen.getByPlaceholderText(/Enter your IBMid/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter last name/i)).toBeInTheDocument();
    expect(screen.getByText(/Department/i)).toBeInTheDocument();
    expect(screen.getByText(/Sexual Identity/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  it('validates form fields', () => {
    render(
      <Router>
        <AccessRequestCard />
      </Router>
    );

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    // Assuming an alert will show up when validation fails.
    expect(window.alert).toHaveBeenCalledWith('Please fill all the fields!');
  });
});

// Mocking the alert function
window.alert = jest.fn();
