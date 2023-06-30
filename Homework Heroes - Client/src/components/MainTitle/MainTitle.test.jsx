import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import MainTitle from '.';

describe('Main Title Compnonet', () => {
    beforeEach(()=>{
        render(<MainTitle/>)
    })

    afterEach(() => {
        cleanup()
    })

    it('should display a main title', () => {
        const element = screen.getByRole('heading')
        expect(element).toBeInTheDocument()
    })
})
