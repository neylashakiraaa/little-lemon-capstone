import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm.jsx';

describe('BookingForm', () => {
  it('shows validation messages when required fields are missing', async () => {
    const user = userEvent.setup();
    render(<BookingForm onSubmit={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: /confirm reservation/i }));
    expect(await screen.findByText('Please select a reservation time.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
  });

  it('submits valid booking details', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<BookingForm onSubmit={onSubmit} />);
    await user.selectOptions(screen.getByLabelText(/choose a time/i), '6:00 PM');
    await user.type(screen.getByLabelText(/full name/i), 'Alex Morgan');
    await user.type(screen.getByLabelText(/email address/i), 'alex@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '5551234567');
    await user.click(screen.getByRole('button', { name: /confirm reservation/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      name: 'Alex Morgan',
      email: 'alex@example.com',
      time: '6:00 PM',
      guests: 2,
    });
  });
});
