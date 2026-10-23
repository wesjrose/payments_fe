import { api } from "./client";

export interface CheckoutSnapshot {
  id: string;
  subtotal: number;
  total: number;
  tax: number;
  currency: string;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export const paymentsApi = {
  // Reuse the same key when retrying so the backend can return the existing
  // snapshot instead of creating a duplicate.
  getCheckoutSnapshot: (idempotencyKey: string) =>
    api.post<CheckoutSnapshot>("/payments/checkout-snapshot", undefined, {
      headers: { "Idempotency-Key": idempotencyKey },
    }),

  // Returns the Stripe PaymentIntent client secret.
  initiatePayment: (checkoutSnapshotId: string) =>
    api.get<string>(
      `/payments/initiate-payment/${encodeURIComponent(checkoutSnapshotId)}`,
    ),
};
