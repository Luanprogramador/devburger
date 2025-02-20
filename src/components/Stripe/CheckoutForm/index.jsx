
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { useState } from "react";
import{useLocation} from 'react-router-dom';
import '../styles.css';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const {
    state:{dpmCheckerLink},
} = useLocation()

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
        console.error('Stripe ou Elements com falha, tente novamente');
      
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect:'if_required',
      
    });

    console.log(paymentIntent);
    console.log(error);
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion"
  }

  return (
    <div className="container">
    <form id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <button disabled={isLoading || !stripe || !elements} id="submit"
       className="button" 
        
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "pagar agora"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>

    <div id="dpm-annotation">
      <p>
os metodos de pagamentos são disponibilizados de acordo com sua região .&nbsp;
<a
  href={dpmCheckerLink}
  target="_blank"
  rel="noopener noreferre"
  id="dpm-integration-checker"
  >
    ver metodos de pagamentos
</a>
      </p>
    </div>
    </div>
  );
}