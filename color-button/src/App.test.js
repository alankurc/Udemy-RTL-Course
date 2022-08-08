import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

it('button has correct initial color', () => {
  render(<App/>);
  // find an element with a role of button and text of 'change to blue'
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});

  // expect the background color to be red
  expect(colorButton).toHaveStyle({backgroundColor: 'red'});

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({backgroundColor: 'blue'});

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to red');
});

it('Initial condition', () => {
  render(<App/>);
  // check the button start enable
  const colorButton = screen.getByRole('button', {name: 'Change to blue'});
  expect(colorButton).toBeEnabled();
  // check the checkbox start unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

it('Checkbox disables button on click an enables on a second click', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const colorButton = screen.getAllByRole('button', {name: 'Change to blue'});

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

it('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'});
  const colorButton = screen.getAllByRole('button', {name: 'Change to blue'});

  fireEvent.click(colorButton);

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: gray');

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle('background-color: blue');
})