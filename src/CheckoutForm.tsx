import { useState, type FormEvent } from "react";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export function CheckoutForm() {
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
    const { error } = await elements.submit();

    if (error) {
      setMessage(error.message ?? "Something went wrong, please try again.");
      setIsSubmitting(false);
      return;
    }

    setMessage("Payment details look good. Processing isn't wired up yet.");
    setIsSubmitting(false);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <section className="checkout-section">
        <h2>Shipping address</h2>
        <AddressElement options={{ mode: "shipping" }} />
      </section>

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
