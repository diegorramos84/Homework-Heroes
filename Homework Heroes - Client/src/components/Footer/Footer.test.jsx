import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Footer from '.';

describe('Footer', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });
  
  afterEach(() => {
      cleanup();
  });

  it('should display footer', () => {
    const footer = screen.getByRole('footer')
    expect(footer).toBeInTheDocument()
  })

  it('should display footer icon', () => {
    const footerImg = screen.getByRole('img')
    expect(footerImg).toBeInTheDocument()
  })

  it('should display footer info', () => {
    const footerImg = screen.getByRole('info')
    expect(footerImg).toBeInTheDocument()
  })
})
