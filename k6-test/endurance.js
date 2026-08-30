import { browseFrontpage, browseProduct, addToCart, viewCart, checkout }
  from './helpers/common.js';

export const options = {
  stages: [
    { duration: '5m', target: 80 },     // Ramp up
    { duration: '120m', target: 80 },   // Steady state 2 jam
    { duration: '5m', target: 0 },      // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.02'],
    checks: ['rate>0.95'],
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
