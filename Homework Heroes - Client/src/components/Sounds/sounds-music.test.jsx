
import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Sounds from './index';

describe('Sounds', () => {
  it('renders the component with the correct elements', () => {
    render(<Sounds />);
    const musicContainer = screen.getByRole('div', { name: 'music-container' });
    const formContainer = screen.getByRole('div', { name: 'form-container' });
    const buttonContainer = screen.getByRole('div', { name: 'button-container' });
    
    expect(musicContainer).toBeInTheDocument();
    expect(formContainer).toBeInTheDocument();
    expect(buttonContainer).toBeInTheDocument();
    
    
    const formLabel = screen.getByLabelText('Relaxing Sounds :');
    const selectInput = screen.getByRole('combobox', { name: 'Relaxing Sounds :' });
    const option = screen.getByText('bells sounds');
    
    expect(formLabel).toBeInTheDocument();
    expect(selectInput).toBeInTheDocument();
    expect(option).toBeInTheDocument();
    
    
    const playButton = screen.getByRole('button', { name: 'Play' });
    const pauseButton = screen.getByRole('button', { name: 'Pause' });
    
    expect(playButton).toBeInTheDocument();
    expect(pauseButton).toBeInTheDocument();
  });

  it('updates the selected track when an option is selected', () => {
    render(<Sounds />);
    const selectInput = screen.getByLabelText('Relaxing Sounds :');
    const option = screen.getByText('bells sounds');

    fireEvent.change(selectInput, { target: { value: option.value } });
    
    expect(selectInput.value).toBe(option.value);
  });
  
  it('calls the playTrack function when the Play button is clicked', () => {
    render(<Sounds />);
    const playButton = screen.getByRole('button', { name: 'Play' });
    const playTrackMock = jest.fn();

    fireEvent.click(playButton);
    
    expect(playTrackMock).toHaveBeenCalled();
  });

  it('calls the pauseTrack function when the Pause button is clicked', () => {
    render(<Sounds />);
    const pauseButton = screen.getByRole('button', { name: 'Pause' });
    const pauseTrackMock = jest.fn();
    
    fireEvent.click(pauseButton);
    
    expect(pauseTrackMock).toHaveBeenCalled();
  });
});

