import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { stripePromise } from "./stripe";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import type { CheckoutSnapshot } from "./api/payments";

interface CheckoutProps {
    snapshot: CheckoutSnapshot
}

function Checkout({ snapshot }: CheckoutProps) {

    const elementsOptions: StripeElementsOptions = {
        mode: "payment",
        amount: snapshot.total,
        currency: snapshot.currency,
        appearance: { theme: "stripe" },
    };

    return (

        <Elements stripe={stripePromise} options={elementsOptions}>
            <CheckoutForm snapshotID={snapshot?.id} />
        </Elements>

    )
}

export default Checkout