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
  getCheckoutSnapshot: () =>
    api.post<CheckoutSnapshot>("/payments/checkout-snapshot"),

  // Returns the Stripe PaymentIntent client secret.
  initiatePayment: (checkoutSnapshotId: string) =>
    api.get<string>(
      `/payments/initiate-payment/${encodeURIComponent(checkoutSnapshotId)}`,
    ),
};
