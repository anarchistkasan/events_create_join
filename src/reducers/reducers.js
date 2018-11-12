import {
    PAYMENT_CHANGE
 } from "~/actions/actions";

export function paymentChanged(state = {payment_type: "free"}, action) {
    switch (action.type) {
        case PAYMENT_CHANGE:
            const value = action.paymentDataEvent.target.value;
            const name = action.paymentDataEvent.target.name;
            const preparedState = Object.assign({}, state);
            preparedState[name] = value;
            
            localStorage.setItem("isPaid", preparedState.payment_type === "paid");
            localStorage.setItem("paymentFee", preparedState.payment_value);

            preparedState.error = value.length === 0;

            return preparedState;

        default:
            return state;
    }
}