import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from "~/components/common/ErrorMessage/ErrorMessage";

import style from '~/styles/main.less';


const onDateTimeChange = (name, event, scope) => {
    scope.props.onChange(name, event, {
        AM: scope.refs["AM-radio"].checked,
        PM: scope.refs["PM-radio"].checked
    });
};


export default class DateTimeControl extends PureComponent {
    render() {
        return (
            <div className={style["input-container-date"]}>
                <div className={style["input-wrapper"]}>
                    <label>Starts on *</label>
                    <input 
                        type="date"
                        id="start-date"
                        name="start-date"
                        min={new Date().toJSON().split('T')[0]}  
                        onChange={(e) => {onDateTimeChange("date", e, this)}}
                    />
                    <span className={style["input-text-at"]}>at</span>
                    <input 
                        type="time"
                        id="start-time"
                        name="start-time"
                        min="00:00"
                        max="12:00"
                        onChange={(e) => {onDateTimeChange("time", e, this)}}
                    />
                    <input 
                        type="radio"
                        value="AM"
                        name="meridian"
                        defaultChecked
                        checked={this.props.amValue}
                        ref="AM-radio"
                        onChange={(e) => {onDateTimeChange("am", e, this)}}
                    /> 
                    <span className={style["meridian"]}>AM</span>
                    <input 
                        type="radio"
                        value="PM"
                        name="meridian"
                        ref="PM-radio"
                        checked={this.props.pmValue}
                        onChange={(e) => {onDateTimeChange("pm", e, this)}}
                    /> 
                    <span className={style["meridian"]}>PM</span>
                    <div className={style["input-error-wrapper"]}>
                        {this.props.error &&
                            <ErrorMessage message={this.props.error} />
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

  DateTimeControl.propTypes = {
    onChange: PropTypes.func,
    error: PropTypes.string
  }