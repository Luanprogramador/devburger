import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    'pk_test_51QmxYuPuCx6S6OdRsZCEJ6fHnEqzkp1Ei24MMNRgIErlBoY9GOG1YZC9PTXApdcjmaLpVzcpGVOuOa5TIK2dap9500JurOCuDZ'
);
export default stripePromise;