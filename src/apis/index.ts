export const PRODUCTS_ENDPOINT =
  'http://vend-test-be-server.herokuapp.com/products';
export const SALES_ENPOINT = 'http://vend-test-be-server.herokuapp.com/sales';

/**
 * Method to get products list
 * @returns {Error|Array[{id: Number, name: String, sku: String, price: Number, picture: String }]} - Either Error or an array of products
 */
export const getProducts = async (): Promise<App.Product[] | Error> => {
  let err: Error | null = null;
  try {
    const response = await fetch(PRODUCTS_ENDPOINT, {
      method: 'GET'
    });

    /**
     * response.json() returns a promise so need await
     */
    const data = await response.json();

    // checking for valid server data
    if (Array.isArray(data)) {
      return data;
    } else {
      // stale server data
      err = new Error('stale server data');
    }
  } catch (error) {
    // 403 error, network error etc
    if (error instanceof Error) {
      err = error;
    } else {
      err = new Error('some other error');
    }
  }
  return err;
};

/**
 * Method to submit a sales
 * @param {Array[{product_id: Number, quantity: Number}]} payload - an array of sale item
 * @returns {Error|Object{total_cost: Number, sold_items: [{product-id: Number, quanity: Number, Price: Number}]}} - Either Error or the sale summary
 */
export const postSales = async (
  payload: App.SaleRequestPayload[]
): Promise<App.SaleResponsePayload | Error> => {
  let err = null;

  try {
    console.log(`postSales: payload = ${JSON.stringify(payload)}`);
    const response = await fetch(SALES_ENPOINT, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    // sale request success
    if (response.status === 200 && response.ok === true) {
      const json = await response.json();
      console.log(`postSales: json = ${JSON.stringify(json)}`);
      return json;
    }
    err = new Error('Some error occured while submittting sales');
  } catch (error) {
    if (error instanceof Error) {
      err = error;
    } else {
      err = new Error('some other error');
    }
  }
  return err;
};
