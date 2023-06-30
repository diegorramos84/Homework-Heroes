import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
expect.extend(matchers);

import LandingPage from '.';

describe('Landing Page', () => {
    beforeEach(()=>{
        render(
        <MemoryRouter>
            <LandingPage/>
        </MemoryRouter>
        )
    })

    afterEach(() => {
        cleanup()
    })

    it('Should display main paragraph p tag', () => {
        const mainParagraph = screen.getByRole('mainParagraph');
        expect(mainParagraph).toBeInTheDocument();
    })

    it('Should display main image', () => {
        const mainParagraph = screen.getByRole('mainImage')
        expect(mainParagraph).toBeInTheDocument();
    })

    it('Should link to register page', () => {
        const registerLink = screen.getByRole('link', { name: /register/i });
        expect(registerLink).toBeInTheDocument();
    })
})
