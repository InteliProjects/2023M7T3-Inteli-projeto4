import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/home/home';

// replace with the actual path to your home.js file


describe('Home Component', () => {
  it('renders home page', () => {
    // Destructure container from the render function's return value
    const { container } = render(<Home />);
    
    // Log the rendered HTML for debugging
    // console.log("Rendered HTML:", container.innerHTML);

    // Use querySelector on the container to find the p element inside div with class 'main'
    const titleElement = container.querySelector('.main > p');

    // Use optional chaining to safely access textContent
    expect(titleElement?.textContent).toMatch(/COMO POSSO AJUDAR VOCÊ HOJE?/i);
    
  });
});
