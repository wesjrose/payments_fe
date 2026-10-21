interface OrderSummaryProps {
  // Amounts are in the currency's smallest unit (e.g. cents), like Stripe.
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export function OrderSummary({ subtotal, tax, total, currency }: OrderSummaryProps) {
  return (
    <section className="checkout-section order-summary">
      <h2>Order summary</h2>
      <dl className="order-summary-rows">
        <div className="order-summary-row">
          <dt>Currency</dt>
          <dd>{currency.toUpperCase()}</dd>
        </div>
        <div className="order-summary-row">
          <dt>Subtotal</dt>
          <dd>{formatAmount(subtotal, currency)}</dd>
        </div>
        <div className="order-summary-row">
          <dt>Tax</dt>
          <dd>{formatAmount(tax, currency)}</dd>
        </div>
        <div className="order-summary-row order-summary-total">
          <dt>Total</dt>
          <dd>{formatAmount(total, currency)}</dd>
        </div>
      </dl>
    </section>
  );
}
