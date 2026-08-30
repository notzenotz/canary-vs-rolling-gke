import { browseFrontpage, browseProduct, addToCart, viewCart, checkout }
  from './helpers/common.js';

export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp up
    { duration: '3m', target: 100 },   // Below normal load
    { duration: '2m', target: 200 },   // Normal load
    { duration: '3m', target: 200 },   // Stay at normal
    { duration: '2m', target: 300 },   // Above normal
    { duration: '3m', target: 300 },   // Stay above normal
    { duration: '2m', target: 400 },   // Breaking point
    { duration: '3m', target: 400 },   // Stay at breaking point
    { duration: '5m', target: 0 },     // Recovery
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],  // lenient untuk stress
    http_req_failed: ['rate<0.10'],     // Toleransi error 10%
  },
};

export default function () {
  const scenario = Math.random();
  if (scenario < 0.4) {
    browseFrontpage();
  } else if (scenario < 0.7) {
    browseProduct();
  } else if (scenario < 0.85) {
    addToCart();
    viewCart();
  } else {
    addToCart();
    checkout();
  }
}
