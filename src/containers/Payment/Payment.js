import { connect } from 'react-redux'
import { paymentChanged } from '~/actions/actions'
import RadioPaymentGroup from "~/components/common/RadioPaymentGroup/RadioPaymentGroup";

const mapStateToProps = state => ({
    paymentData: state.paymentChanged,
    error: state.paymentChanged.error
})

const mapDispatchToProps = dispatch => ({
    paymentChanged: event => dispatch(paymentChanged(event))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RadioPaymentGroup)
