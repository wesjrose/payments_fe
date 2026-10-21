import { Elements } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { stripePromise } from "./stripe";
import "./App.css";

// Hardcoded to match the backend's prototype cart for now. Once the backend
// returns a real PaymentIntent client secret this will come from there.
const elementsOptions: StripeElementsOptions = {
  mode: "payment",
  amount: 10025,
  currency: "cad",
  appearance: { theme: "stripe" },
};

function App() {
  return (
    <main className="checkout-page">
      <div className="checkout-card">
        <h1>Checkout</h1>
        <p className="checkout-subtitle">Payment prototype &mdash; test mode</p>

        <Elements stripe={stripePromise} options={elementsOptions}>
          <CheckoutForm />
        </Elements>
      </div>
    </main>
  );
}

export default App;
