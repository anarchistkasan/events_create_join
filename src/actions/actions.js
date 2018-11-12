export const PAYMENT_CHANGE = "PAYMENT_CHANGE";

export function paymentChanged(paymentDataEvent) {
    return {
        type: PAYMENT_CHANGE,
        paymentDataEvent
    }
}