import { useState, type FormEvent } from "react";

import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { paymentsApi } from "./api/payments";

interface CheckoutFormProps {
  snapshotID: string
}

export function CheckoutForm({ snapshotID }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    // Validates and collects the payment + address details entered into the
    // Elements. The next step (not wired up yet) is sending these details to
    // the backend to create a PaymentIntent and confirming the payment.
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setMessage(submitError.message ?? "Something went wrong, please try again.");
      setIsSubmitting(false);
      return;
    }

    let clientSecret: string;

    try {
      clientSecret = await paymentsApi.initiatePayment(snapshotID);
    } catch {
      setMessage("Couldn't start the payment")
      setIsSubmitting(false)
      return
    }


    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-complete`
      }
    }
    )

    if (error) {
      setMessage(error.message ?? "Payment processing error, please try again")
      setIsSubmitting(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      {/* <section className="checkout-section">
        <h2>Shipping address</h2>
        <AddressElement options={{ mode: "shipping" }} />
      </section> */}

      <section className="checkout-section">
        <h2>Payment details</h2>
        <PaymentElement />
      </section>

      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="checkout-submit"
      >
        {isSubmitting ? "Processing..." : "Pay now"}
      </button>

      {message && <div className="checkout-message">{message}</div>}
    </form>
  );
}
