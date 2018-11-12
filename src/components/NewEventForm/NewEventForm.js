import React, { Component } from "react";

import style from "~/styles/main.less";

import { 
    isObjectTruthy,
    isObjectEmpty,
    MAX_DESCRIPTION_SYMBOLS,
    MANDATORY_FIELDS 
} from "~/utils/Utils";

import NewEventHeader from "~/components/NewEventHeader/NewEventHeader";
import EventSection from "~/components/EventSection/EventSection";

import TextInput from "~/components/common/TextInput/TextInput";
import Dropdown from "~/components/common/Dropdown/Dropdown";
import Payment from "~/containers/Payment/Payment";
import NumberInputWithText from "~/components/common/NumberInputWithText/NumberInputWithText";
import DateTimeControl from "~/components/common/DateTimeControl/DateTimeControl";

const checkMandatoryFields = (name, elementType, value) => {
    let isInvalid = false;
    if (MANDATORY_FIELDS.indexOf(name) > -1) {

        if (elementType === "select-one") {
            if(value == 0) {
                isInvalid = true; 
            }
        }

        if (["text", "textarea", "date", "time"].indexOf(elementType) > -1) {
            if (value.length < 1) {
                isInvalid = true;
            }
        }

        return isInvalid;
    }
}

const isSubmissionDisabled = (state, fields) => {

    const areValuesFilled = fields.every((title) => {
        return !!state[title];
    });

    const isPaymentEmpty = localStorage.isPaid && localStorage.paymentFee.length === 0;

    return isObjectEmpty(state.errors) ||
        isObjectTruthy(state.errors) ||
        !areValuesFilled ||
        isPaymentEmpty;
}

const getDescriptionHint = (symbolsLeft) => {
    if (symbolsLeft === MAX_DESCRIPTION_SYMBOLS) {
        return `Max length ${MAX_DESCRIPTION_SYMBOLS} characters`;
    }

    return `${symbolsLeft} symbols left`;
}

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export default class NewEventForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: true,
            errors: {},
            coordinator: "Walter Nelson",
            category: 0,
            isLoading: false,
            descriptionLengthLeft: MAX_DESCRIPTION_SYMBOLS
        };
    }

    submitForm() {
        const output = {
            title: this.state.title,
            description: this.state.description,
            category_id: this.state.category,
            paid_event: Boolean(localStorage.isPaid),
            event_fee: Number(localStorage.paymentFee),
            reward: Number(this.state.reward),
            date: `${this.state.date}T${this.state.time}`,
            duration: Number(this.state.duration),
            coordinator: {
                email: this.state.email,
                id: this.state.coordinator
            }
        };

        this.setState({isOpened: false});

        console.log("output", output);
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.errors !== this.state.errors || nextState.isOpened !== this.state.isOpened;
    }

    componentDidMount() {
        localStorage.setItem("isPaid", "");
        localStorage.setItem("paymentFee", "");
        fetch("http://www.mocky.io/v2/5bcdd8732f00007300c855da")
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.setState({ isLoading: false });
                return response;
            })
            .then(response => response.json())
            .then((items) => {
                this.titles = items;
            })
            .then(data => {
                this.setState({ isLoading: false })
            });
      }


    validateTitle(title) {
       return this.titles.some((item) => {
            return item.title === title;
        })
    }

    handleInputChange(name, event, additionalOptions) {
        let value = event.target.value || event.nativeEvent.target.value;
        const errors = Object.assign({}, this.state.errors);
        const state = Object.assign({}, this.state);
        const elementType = event.target.type;

        errors[name] = null;

        if (name === "description") {
            state.descriptionLengthLeft = MAX_DESCRIPTION_SYMBOLS - value.length;
        }

        
        if (checkMandatoryFields(name, elementType, value)){
            errors[name] = `${name} cannot be empty`;
        }

        if (name === "email") {
            if (!validateEmail(value)) {
                errors.email = "Invalid email format";
            }
        }

        if (name === "title") {
            if (this.validateTitle(value)) {
                errors.title = "No duplicate name allowed";
            }
        }

        if (["am", "pm", "time"].indexOf(name) > -1) {
            if (additionalOptions.PM) {
                const splittedTime = value.split(":");
                value = `${Number(splittedTime[0]) + 12}:${splittedTime[1]}`;
            }
        }

        Object.assign(state, {[name]: value, errors});

        if (["am", "pm"].indexOf(name) > -1) {
            state[name] = additionalOptions[name.toUpperCase()];
        }
        this.setState(state);
    }

    render() {

        if (this.state.isLoading) {
            return <p>Loading…</p>;
        }

        if (!this.state.isOpened) {
            return (
                <div className={style["success-message"]}>
                    <h1>Success</h1>
                    <p>Event has been created</p>
                </div>
            );
        }

        return (
            <div className={style["new-event-form"]}>
                <NewEventHeader />
                <EventSection
                    header="About"
                >
                    <TextInput
                        label="title"
                        isObligatory={true}
                        isMultiline={false}
                        placeholder="Make it short and clear"
                        onChange={(e) => {this.handleInputChange("title", e)}}
                        error={this.state.errors.title}
                        value={this.state.title}
                     />
                     <TextInput
                        label="description"
                        isObligatory={true}
                        isMultiline={true}
                        placeholder="Write about your event, be creative"
                        hint={getDescriptionHint(this.state.descriptionLengthLeft)}
                        onChange={(e) => {this.handleInputChange("description", e)}}
                        error={this.state.errors.description}
                        value={this.state.description}
                    />
                    <Dropdown
                        label="category"
                        placeholder="Select category"
                        hint="Descriptive topic"
                        url="http://www.mocky.io/v2/5bcdd3942f00002c00c855ba"
                        value={this.state.category}
                        onChange={(e) => {this.handleInputChange("category", e)}}
                        value={this.state.category}
                    />
                    <Payment />
                    <NumberInputWithText
                        label="reward"
                        text="reward points for attendance"
                        placeholder="Number"
                        onChange={(e) => {this.handleInputChange("reward", e)}}
                        error={this.state.errors.reward}
                        value={this.state.reward}
                    />
                </EventSection>
                <EventSection
                    header="Coordinator"
                >
                    <Dropdown
                        label="Responsible"
                        isObligatory={true}
                        url="http://www.mocky.io/v2/5bcdd7992f00006300c855d5"
                        onChange={(e) => {this.handleInputChange("coordinator", e)}}
                        error={this.state.errors.coordinator}
                        value={this.state.coordinator}
                    />
                    <TextInput
                        label="email"
                        placeholder="email"
                        onChange={(e) => {this.handleInputChange("email", e)}}
                        error={this.state.errors.email}
                        value={this.state.email}
                    />
                </EventSection>
                <EventSection
                    header="When"
                >
                    <DateTimeControl
                        onChange={(name, e, options) => {this.handleInputChange(name, e, options)}}
                        error={this.state.errors.date || this.state.errors.time}
                        value={this.state.date}
                        amValue={this.state.am}
                        pmValue={this.state.pm}
                    />
                    <NumberInputWithText
                        label="Duration"
                        text="hour"
                        placeholder="Number"
                        onChange={(e) => {this.handleInputChange("duration", e)}}
                        error={this.state.errors.duration}
                        value={this.state.duration}
                    /> 
                </EventSection> 
                <button
                    type="submit"
                    onClick={this.submitForm.bind(this)}
                    className={style["submit-button"]}
                    disabled={isSubmissionDisabled(this.state, MANDATORY_FIELDS)}
                >
                {"Publish Event"}
                </button>
            </div>
      );
    }
  }
