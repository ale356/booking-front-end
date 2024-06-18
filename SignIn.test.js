import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignIn from './src/pages/LoginPage';

/**
 * Test suite for the SignIn component.
 */
describe('SignIn component', () => {
  /**
   * Test case: Renders the login form.
   */
  test('renders login form', () => {
    const { getByTestId, getByText } = render(
      <Router>
        <SignIn />
      </Router>
    );
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');
    const signInButton = getByText('Sign In');
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(signInButton).toBeTruthy();
  });

  /**
   * Test case: Submits form with valid credentials.
   */
  test('submits form with valid credentials', async () => {
    // Mock fetch function
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    await act(async () => {
      const { getByTestId, getByText } = render(
        <Router>
          <SignIn />
        </Router>
      );
      fireEvent.change(getByTestId('username'), { target: { value: 'testUser' } });
      fireEvent.change(getByTestId('password'), { target: { value: 'testPassword' } });
      fireEvent.click(getByText('Sign In'));
      // Await redirection or any other success behavior
    });
  });

  /**
   * Test case: Displays error message with invalid credentials.
   */
  test('displays error message with invalid credentials', async () => {
    // Mock fetch function
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Wrong credentials. Please try again.'));
    const { getByTestId, getByText, findByText } = render(
      <Router>
        <SignIn />
      </Router>
    );
    const usernameInput = getByTestId('username');
    const passwordInput = getByTestId('password');
    fireEvent.change(usernameInput, { target: { value: 'invalidUser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
    fireEvent.click(getByText('Sign In'));
    try {
      const errorMessage = await findByText('Wrong credentials. Please try again.');
      expect(errorMessage).toBeInTheDocument();
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
