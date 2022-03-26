import { getProducts, postSales } from '../../apis/index';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { mockProducts, mockSale } from '../../test/mock/data';

jest.mock('../../apis/index');

describe('App component', () => {
  beforeEach(() => {
    // mock getRepos to resolve mock data in 0s
    (getProducts as jest.Mock).mockImplementation(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(mockProducts);
        }, 0);
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('App component shows product list correctly', async () => {
    render(<App />);

    // product 1 shown with id, name and price
    let name = await screen.findByText('Bed');
    expect(name).toBeInTheDocument();
    let id = await screen.findByText(1);
    expect(id).toBeInTheDocument();
    let price = await screen.findByText('$100');
    expect(price).toBeInTheDocument();

    // product 2 shown with id, name and price
    name = await screen.findByText('Chair');
    expect(name).toBeInTheDocument();
    id = await screen.findByText(2);
    expect(id).toBeInTheDocument();
    price = await screen.findByText('$200');
    expect(price).toBeInTheDocument();

    // title: Products, Product and Retail Price shown
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Retail Price')).toBeInTheDocument();

    // button Create New Product shown
    expect(screen.getByText('Create New Product')).toBeInTheDocument();
  });

  it('Click product on product list, it is added to cart', async () => {
    render(<App />);

    const bed = await screen.findByText('Bed');
    userEvent.click(bed);

    // cart item shown correctly with qty, name, price, and remove button
    const cartQty = screen.getByTestId('item-1-qty') as HTMLInputElement;
    expect(cartQty.value).toEqual('1');
    const cartName = screen.getByTestId('item-1-name');
    expect(cartName.innerHTML).toEqual('Bed');
    const cartPrice = screen.getByTestId('item-1-price');
    expect(cartPrice.innerHTML).toEqual('$100');
    const cartRemove = screen.getByTestId('item-1-remove');
    expect(cartRemove.innerHTML).toEqual('Remove');

    // pay section correct
    expect(screen.getByText('Pay')).toBeInTheDocument();
    expect(screen.getByText('1 Items')).toBeInTheDocument();
  });

  it('update qty pay section update correctly', async () => {
    render(<App />);

    // user add Bed to cart
    const bed = await screen.findByText('Bed');
    userEvent.click(bed);

    // user update qty of Bed to 3
    const cartQty = screen.getByTestId('item-1-qty');
    userEvent.type(cartQty, '3{enter}');

    // total change to $300
    expect(screen.getByText('$300')).toBeInTheDocument();
  });

  /**
   * Click Pay button, post sales request success, go to SalesSummary page.
   * Click Done button to go back to Products page
   */
  it('navigation between Sales Summary & Products page correct', async () => {
    // mock a success sale request
    (postSales as jest.Mock).mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(mockSale);
      });
    });

    render(<App />);

    // user add Bed to cart
    const bed = await screen.findByText('Bed');
    userEvent.click(bed);

    userEvent.click(screen.getByText('Pay'));

    // Sale summary page shown
    const saleSummary = await screen.findByText('SALE SUMMARY');
    expect(saleSummary).toBeInTheDocument();
    expect(screen.getByText('Payment Received')).toBeInTheDocument();

    // click DONE button
    userEvent.click(screen.getByText('Done (ESC)'));

    // back to Product list page with Products title shown
    const products = await screen.findByText('Products');
    expect(products).toBeInTheDocument();
  });

  it('Click remove button, item will be removed from cart', async () => {
    render(<App />);

    // user add Bed to cart
    const bed = await screen.findByText('Bed');
    userEvent.click(bed);

    // pay button & total value of cart shown
    expect(screen.getByText('Pay')).toBeInTheDocument();
    expect(screen.getAllByText('$100').length).toEqual(2);

    // item-1-qty exist before click remove button
    expect(screen.getByTestId('item-1-qty')).toBeInTheDocument();

    // click remove button
    userEvent.click(screen.getByTestId('item-1-remove'));

    // item-1 is removed, no longer in the document
    expect(screen.queryByTestId('item-1-qty')).toBe(null);

    // no pay button
    expect(screen.queryByText('Pay')).toBe(null);
  });
});
