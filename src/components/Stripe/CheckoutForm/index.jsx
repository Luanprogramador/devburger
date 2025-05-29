
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { useState } from "react";
import{useLocation, useNavigate} from 'react-router-dom';
import './styles.css';
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export  function CheckoutForm() {
  const {cartProducts, clearCart} = useCart()
  const navigate = useNavigate();
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

    
    if (error) {
      setMessage(error.message);
      ToastContainer.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded')
{  try{

  const products = cartProducts.map((product)=>{
    return {
      id: product.id, 
      quantity: product.quantity,
    price:product.price,
    };
});
  const {status} = await api.post('/orders',
       {products}
      ,{

      validateStatus: () => true,
});


if(status === 200 || status === 201 ){

setTimeout(()=>{
navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
},3000);
clearCart()

toast.success('Pedido Realizado com Sucesso!');
}else if (status === 409){
toast .error('Falha ao Realizar o seu Pedido');
}else{
throw new Error();
}


}catch (error){
toast.error('falha no sistema! tente noamente');
}
} else {
  navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
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
      {/* Show any error or success messages*/ }
      {message && <div id="payment-message">{message}</div>}
    </form>

    <div id="dpm-annotation">
      <p>
os metodos de pagamentos são disponibilizados de acordo com sua região.&nbsp;
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