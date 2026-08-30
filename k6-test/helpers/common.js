import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://YOUR_APP_EXTERNAL_IP';

export function browseFrontpage() {
  const res = http.get(`${BASE_URL}/`);
  check(res, {
    'homepage status 200': (r) => r.status === 200,
    'homepage load < 2s': (r) => r.timings.duration < 2000,
  });
  sleep(1);
}

export function browseProduct() {
  const productIds = [
    'OLJCESPC7Z', '66VCHSJNUP', '1YMWWN1N4O',
    'L9ECAV7KIM', '2ZYFJ3GM2N', '0PUK6V6EV0',
    'LS4PSXUNUM', '9SIQT8TOJO', '6E92ZMYYFZ',
  ];
  const id = productIds[Math.floor(Math.random() * productIds.length)];
  const res = http.get(`${BASE_URL}/product/${id}`);
  check(res, {
    'product page status 200': (r) => r.status === 200,
    'product page load < 2s': (r) => r.timings.duration < 2000,
  });
  sleep(1);
}

export function addToCart() {
  const res = http.post(`${BASE_URL}/cart`, {
    product_id: 'OLJCESPC7Z',
    quantity: '1',
  });
  check(res, {
    'add to cart status 200': (r) => r.status === 200,
  });
  sleep(1);
}

export function viewCart() {
  const res = http.get(`${BASE_URL}/cart`);
  check(res, {
    'view cart status 200': (r) => r.status === 200,
  });
  sleep(1);
}

export function checkout() {
  const res = http.post(`${BASE_URL}/cart/checkout`, {
    email: 'someone@example.com',
    street_address: '1600 Amphitheatre Parkway',
    zip_code: '94043',
    city: 'Mountain View',
    state: 'CA',
    country: 'United States',
    credit_card_number: '4432801561520454',
    credit_card_expiration_month: '1',
    credit_card_expiration_year: '2027',
    credit_card_cvv: '672',
  });
  check(res, {
    'checkout status 200': (r) => r.status === 200,
  });
  sleep(2);
}