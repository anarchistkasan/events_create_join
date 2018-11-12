import React, { Component } from 'react';
import PropTypes from 'prop-types';


import ErrorMessage from "~/components/common/ErrorMessage/ErrorMessage";

import style from '~/styles/main.less';

export default class RadioPaymentGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentType: "free"
        };
    }

    handleChange(event) {
        this.setState({paymentType: event.target.value});
        this.handleInputChange("description", e);
        this.props.onChange(event);
    }

    render() {
        const isPaidEvent = this.props.paymentData.payment_type === "paid";
        const isFreeEvent = this.props.paymentData.payment_type === "free";

        return (
            <div className={style["input-container-radio"]}>
                <div className={style["input-wrapper"]}>
                    <label>PAYMENT *</label>
                        <div 
                            key="free-event"
                            className={style["radio-wrapper"]}
                        >
                            <input 
                                type="radio"
                                value="free"
                                name="payment_type"
                                checked={isFreeEvent}
                                onChange={(e) => {this.props.paymentChanged(e)}}
                            /> 
                            <span>Free event</span>
                        </div>
                        <div 
                            key="paid-event"
                            className={style["radio-wrapper"]}
                        >
                            <input 
                                type="radio"
                                value="paid"
                                name="payment_type"
                                checked={isPaidEvent}
                                onChange={(e) => {this.props.paymentChanged(e)}}
                            /> 
                            <span>Paid event</span>
                            
                        </div>
                        {isPaidEvent &&
                                <div className={style["input-wrapper"]}>
                                    <input
                                        type="number"
                                        name="payment_value"
                                        onChange={(e) => {this.props.paymentChanged(e)}}
                                        value={this.props.paymentData.payment_value}
                                    />
                                        $
                                    <div className={style["input-error-wrapper"]}>
                                        {this.props.error &&
                                            <ErrorMessage message="Fee cannot be empty" />
                                        }
                                    </div>
                                </div>
                            }
                    <div className={style["input-error-wrapper"]}>
                        {this.props.error &&
                            <p>{this.props.error}</p>
                        }
                    </div>
                 </div>
                 {this.props.hint &&
                    <div className={style["hint-wrapper"]}>
                        <div className={style["hint-spacer"]} />
                        <p>{this.props.hint}</p>
                        <div className={style["hint-error"]} />
                    </div>
                }
            </div>
      );
    }
  }