import { getProducts, PRODUCTS_ENDPOINT } from '../index';

describe('apis', () => {
  // spy on fetch
  beforeAll(() => jest.spyOn(global, 'fetch'));

  // clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getProducts send to correct endpoint, using get method, and return data correctly', async () => {
    // return an empty array of products
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => []
    });

    const data = await getProducts();

    // fetch been called
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // a get method with correct url
    expect(global.fetch).toHaveBeenCalledWith(
      PRODUCTS_ENDPOINT,
      expect.objectContaining({
        method: 'GET'
      })
    );

    // data is an empty array
    expect(data).toEqual([]);
  });

  it('getProducts return Error object when fetch fail to get response', async () => {
    // fetch fails for some reaons
    (global.fetch as jest.Mock).mockRejectedValue(new Error('some error'));

    const result = await getProducts();

    expect(result instanceof Error).toEqual(true);
  });

  /**
   * TODO: similar unit tests for postSales method
   */
});
