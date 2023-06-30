import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Button from '.';

describe('Button component', () => {
    beforeEach(()=>{
        render(<Button/>)
    })

    afterEach(() => {
        cleanup()
    })

    it('should display the button', () => {
        const element = screen.getByRole('button')
        expect(element).toBeInTheDocument()
    })
})
