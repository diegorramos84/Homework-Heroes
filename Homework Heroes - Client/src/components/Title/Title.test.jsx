import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Title from '.';

describe('Title component', () => {
    beforeEach(()=>{
        render(<Title/>)
    })

    afterEach(() => {
        cleanup()
    })

    it('should display a title', () => {
        const element = screen.getByRole('heading')
        expect(element).toBeInTheDocument()
    })
})
