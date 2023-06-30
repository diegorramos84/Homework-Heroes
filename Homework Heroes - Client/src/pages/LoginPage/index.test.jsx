import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import store from '../../store';
import { Provider } from 'react-redux';
expect.extend(matchers);

import LoginPage from '.';


describe('Login page', () => {
    beforeEach(()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </MemoryRouter>
        )
    })

    afterEach(() => {
        cleanup()
    })

    it('Should display the Login heading', () => {
        const headingElement = screen.getByRole('heading', { level: 1 });
        const expectedContent = 'Login';

        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(expectedContent);  
    })

    it('render the email', () => {
        const username = screen.getByText(/email/i);
        expect(username).toBeInTheDocument();
    })

    it('render the password', () => {
        const password = screen.getByText(/password/i);
        expect(password).toBeInTheDocument();
    })

    // it('renders the login button', () => {
    //     render(
    //         <MemoryRouter initialEntries={['/']}>
    //                 <LoginPage />
    //         </MemoryRouter>
    //         );

    //         const loginButton = screen.getByRole("login-btn", { name: 'Login' });
    //         expect(loginButton).toBeInTheDocument();
    // });

    it('should display p tag for "dont have an account"', () => {
        const pTagForAccount = screen.getByRole('account');
        expect(pTagForAccount).toBeInTheDocument();
    })

    it('Should link to register page', () => {
        const registerLink = screen.getByRole('link', { name: /register/i });
        expect(registerLink).toBeInTheDocument();
    })

});
