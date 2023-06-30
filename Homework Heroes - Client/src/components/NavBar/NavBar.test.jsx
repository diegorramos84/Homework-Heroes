import React, {useState} from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NavBar from '.';
import { BurgerNavContext } from '../../context/burgerNavContext';
const BurgerNavClick = () => {
    setIsOpen(!isOpen)
}

describe('NavBar', () => {

    beforeEach(() => {
      render(
        <BurgerNavContext.Provider value={{BurgerNavClick, isOpen}}>
          <MemoryRouter>
              <NavBar />
          </MemoryRouter>
        </BurgerNavContext.Provider>
      );
    });

    afterEach(() => {
        cleanup();
      });

      it('Checks the BurgerNavClick', () => {
        const [isOpen, setIsOpen] = useState(false)
        const button = screen.getByRole('button')

        fireEvent.click(button)

        expect(isOpen).toEqual(true)

      })

      it('Checks NavBar is there', () => {
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument()
      })

    it('renders the Home link', () => {
        const homeLink = screen.getByRole('links');
        expect(homeLink).toBeInTheDocument();
      });

      it('renders the Login link', () => {
        const loginLink = screen.getByRole('links');
        expect(loginLink).toBeInTheDocument();
      });
    
    it('renders the Register link', () => {
        const registerLink = screen.getByRole('links');
        expect(registerLink).toBeInTheDocument();
      });

    it('renders the Logout link', () => {
        const logoutLink = screen.getByRole('links');
        expect(logoutLink).toBeInTheDocument();
      });


});
