import { loadStripe } from "@stripe/stripe-js";

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing VITE_STRIPE_PUBLISHABLE_KEY. Set it in payment_fe/.env (use a Stripe test-mode publishable key).",
  );
}

export const stripePromise = loadStripe(publishableKey);
