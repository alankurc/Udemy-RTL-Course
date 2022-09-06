import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';
import { replaceCamelWithSpaces } from "./App";

it('button has correct initial color', () => {
  render(<App/>);
  // find an element with a role of button and text of 'change to blue'
  const colorButton = screen.getByRole('button', {name: 'Change to MediumVioletRed'});

  // expect the background color to be red
  expect(colorButton).toHaveStyle({backgroundColor: 'MediumVioletRed'});

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({backgroundColor: 'MidnightBlue'});

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to MidnightBlue');
});

it('Initial condition', () => {
  render(<App/>);
  // check the button start enable
  const colorButton = screen.getByRole('button', {name: 'Change to MidnightBlue'});
  expect(colorButton).toBeEnabled();
  // check the checkbox start unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

it('Checkbox disables button on click an enables on a second click', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const colorButton = screen.getAllByRole('button', {name: 'Change to MidnightBlue'});

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

it('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const colorButton = screen.getAllByRole('button', {name: 'Change to MidnightBlue'});

  fireEvent.click(checkbox);

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: MidnightBlue');
});

describe('Spaces before camel-case capital letters', () => {
  it('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  it('Works for one inner capital letters', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  it('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
})