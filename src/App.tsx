import { Elements } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";
import { stripePromise } from "./stripe";
import type { CheckoutSnapshot } from "./api/payments";
import { paymentsApi } from "./api/payments";

import "./App.css";
import { useState, useEffect } from "react";

// Hardcoded to match the backend's prototype cart for now. Once the backend
// returns a real PaymentIntent client secret this will come from there.
const elementsOptions: StripeElementsOptions = {
  mode: "payment",
  amount: 10025,
  currency: "cad",
  appearance: { theme: "stripe" },
};

function App() {

  const [snapshot, setSnapshot] = useState<CheckoutSnapshot | null>(null);
  console.log(snapshot)
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {

    const controller = new AbortController();

    paymentsApi.getCheckoutSnapshot().then(setSnapshot).catch((err) => { setSnapshot(err.message) })
    console.log(snapshot)

  }, [])


  return (
    <main className="checkout-page">
      <div className="checkout-card">
        <h1>Checkout</h1>
        <p className="checkout-subtitle">Payment prototype &mdash; test mode</p>

        {/* Placeholder values; replace with data from the backend. */}
        {snapshot && <OrderSummary subtotal={snapshot.subtotal} tax={snapshot.tax} total={snapshot.total} currency={snapshot.currency} />}

        <Elements stripe={stripePromise} options={elementsOptions}>
          <CheckoutForm />
        </Elements>
      </div>
    </main>
  );
}

export default App;
