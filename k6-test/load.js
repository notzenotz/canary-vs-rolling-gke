import { browseFrontpage, browseProduct, addToCart, viewCart, checkout }
  from './helpers/common.js';

export const options = {
  stages: [
    { duration: '2m', target: 50 },   // Ramp up ke 50 VUs
    { duration: '5m', target: 50 },   // Steady state 50 VUs
    { duration: '2m', target: 100 },  // Ramp up ke 100 VUs
    { duration: '5m', target: 100 },  // Steady state 100 VUs
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],   // 95% req < 2s
    http_req_failed: ['rate<0.01'],      // Error rate < 1%
    checks: ['rate>0.95'],               // 95% checks pass
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

