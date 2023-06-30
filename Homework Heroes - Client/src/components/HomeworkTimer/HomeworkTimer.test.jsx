import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HomeworkTimer from './HomeworkTimer';

describe('HomeworkTimer', () => {
  test('should render the component', () => {
    render(<HomeworkTimer />);
  });

  test('should start the timer', () => {
    const { getByText } = render(<HomeworkTimer />);
    const startButton = getByText('Start');

    fireEvent.click(startButton);

    expect(document.querySelector('.timer-button.running')).toBeTruthy();
  });

  test('should stop the timer', () => {
    const { getByText } = render(<HomeworkTimer />);
    const startButton = getByText('Start');
    const stopButton = getByText('Stop');

    fireEvent.click(startButton);
    fireEvent.click(stopButton);

    expect(document.querySelector('.timer-button.running')).toBeFalsy();
  });

  test('should reset the timer', () => {
    const { getByText } = render(<HomeworkTimer />);
    const startButton = getByText('Start');
    const resetButton = getByText('Reset');

    fireEvent.click(startButton);
    fireEvent.click(resetButton);

    expect(document.querySelector('.timer-button.running')).toBeFalsy();
    expect(document.querySelector('.timer-container').textContent).toBe('25:00');
  });

  test('should set the timer duration to Homework Time', () => {
    const { getByText } = render(<HomeworkTimer />);
    const homeworkTimeButton = getByText('Homework Time');

    fireEvent.click(homeworkTimeButton);

    expect(document.querySelector('.timer-button.running')).toBeFalsy();
    expect(document.querySelector('.timer-container').textContent).toBe('25:00');
  });

  test('should display a message after every 30 seconds', () => {
    jest.useFakeTimers();

    const { getByText, queryByText } = render(<HomeworkTimer />);
    const startButton = getByText('Start');

    fireEvent.click(startButton);

    jest.advanceTimersByTime(30000);

    expect(queryByText(/Keep going, you got this/)).toBeTruthy();

    jest.advanceTimersByTime(30000);

    expect(queryByText(/Keep going, you got this/)).toBeFalsy();
  });
});
