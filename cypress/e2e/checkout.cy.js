/// <reference types='cypress' />

import HomePage from '../support/pages/homePage';
import LaptopsPage from '../support/pages/laptopsPage';
import ProductPage from '../support/pages/productPage';
import CartPage from '../support/pages/cartPage';
import OrderPage from '../support/pages/orderPage';
import faker from 'faker';

function generateUserData() {
  return {
    name: faker.name.firstName(),
    country: faker.address.country(),
    city: faker.address.city(),
    creditCard: faker.finance.creditCardNumber(),
    month: faker.date.month(),
    year: faker.random.number({ min: 2023, max: 2030 }).toString()
  };
}

describe('DemoBlaze Automation', () => {
  it('the user can add an item to the cart and purchase it', () => {
    const userData = generateUserData();
    const productName = 'Sony vaio i7';

    HomePage.visit();
    HomePage.clickLaptopsCategory();

    LaptopsPage.clickOnProduct(productName);

    ProductPage.addToCart();

    CartPage.checkProductInCart(productName);
    CartPage.clickPlaceOrder();

    OrderPage.fillOrderForm(
      userData.name,
      userData.country,
      userData.city,
      userData.creditCard,
      userData.month,
      userData.year
    );
    OrderPage.clickPurchase();

    OrderPage.assertOrderDetails(
      userData.name,
      userData.creditCard
    );
    OrderPage.clickOK();
  });
});
