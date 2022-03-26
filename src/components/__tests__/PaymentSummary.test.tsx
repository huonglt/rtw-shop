import PaymentSummary from '../PaymentSummary';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Payment Summary', () => {
  it('content and Done button is correct', () => {
    const backtoShop = jest.fn();

    render(<PaymentSummary backtoShop={backtoShop} />);

    expect(screen.getByText('Payment Received')).toBeInTheDocument();
    expect(screen.getByText('Print Receipt')).toBeInTheDocument();
    expect(screen.getByText('Gift Receipt')).toBeInTheDocument();
    expect(screen.getByText('Email Receipt')).toBeInTheDocument();

    // click button Done
    userEvent.click(screen.getByText('Done (ESC)'));

    // backtoShop is called
    expect(backtoShop as jest.Mock).toHaveBeenCalledTimes(1);
  });
});
