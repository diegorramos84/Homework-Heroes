import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import store from '../../store';
import { Provider } from 'react-redux';
expect.extend(matchers);

import RegisterPage from '.';


describe('Register page', () => {
    beforeEach(()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <Provider store={store}>
                    <RegisterPage />
                </Provider>
            </MemoryRouter>
        )
    })

    afterEach(() => {
        cleanup()
    })

    it('Should display the Register heading', () => {
        const headingElement = screen.getByRole('heading', { level: 1 });
        const expectedContent = 'Register';

        expect(headingElement).toBeInTheDocument();
        expect(headingElement.textContent).toBe(expectedContent);  
    })

    it('Should display the student name', () => {
        const username = screen.getByRole('studentName');
        expect(username).toBeInTheDocument();
    })

    it('Should display the password', () => {
        const password = screen.getByRole('password');
        expect(password).toBeInTheDocument();
    })

    it('Should display the confirm password', () => {
        const confirmPassword = screen.getByText(/confirm password/i);
        expect(confirmPassword).toBeInTheDocument();
    })

    it('Should display the email', () => {
        const email = screen.getByText(/email/i);
        expect(email).toBeInTheDocument();
    })

    
    it('Should display the role', () => {
        const role = screen.getByText(/role/i);
        expect(role).toBeInTheDocument();
    })

    it('Should display the level', () => {
        const level = screen.getByText(/level/i);
        expect(level).toBeInTheDocument();
    })

    it('Should display the date of birth', () => {
        const dob = screen.getByText(/date of birth/i);
        expect(dob).toBeInTheDocument();
    })

    it('Should display the school', () => {
        const school = screen.getByText(/school/i);
        expect(school).toBeInTheDocument();
    })
    
    it('Should display the school_class', () => {
        const school_class = screen.getByText(/class/i);
        expect(school_class).toBeInTheDocument();
    })

    it('Should display the p tag of select fav superhero ', () => {
        const favSuperhero = screen.getByRole('fav-superhero');
        expect(favSuperhero).toBeInTheDocument();
    })

});