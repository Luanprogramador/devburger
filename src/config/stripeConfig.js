import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    'pk_test_51QmxYlL1cs455NBHdRfVYvVqNVb5v7Hl7cHhlStOfJvUGyRg40f23WJgNvkskZDAcKet9b8SKbnGJSyPSpwyCCvh00B1QBexOC'
);
export default stripePromise;