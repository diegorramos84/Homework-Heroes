import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import LandingButton from '.';

describe('Landing Button component', () => {
    beforeEach(()=>{
        render(<LandingButton/>)
    })

    afterEach(() => {
        cleanup()
    })

    it('should display the main landing button', () => {
        const element = screen.getByRole('button')
        expect(element).toBeInTheDocument()
    })
})
