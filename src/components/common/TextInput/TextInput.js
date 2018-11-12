import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from "~/components/common/ErrorMessage/ErrorMessage";

import { MAX_DESCRIPTION_SYMBOLS } from "~/utils/Utils";

import style from '~/styles/main.less';

const getInputProps = (props) => {
    const preparedProps = {
        placeholder: props.placeholder,
        onChange: props.onChange,
        value: props.value
    };

    if (props.isObligatory) {
        preparedProps.required = true;
    }

    return preparedProps;
};

export default class TextInput extends PureComponent {
    render() {
        return (
            <div className={style["input-container"]}>
                <div className={style["input-wrapper"]}>
                    <label>{`${this.props.label}${this.props.isObligatory ? " *" : ""}` }</label>
                    {this.props.isMultiline ? 
                        <textarea 
                            {...getInputProps(this.props)}
                            maxLength={MAX_DESCRIPTION_SYMBOLS} 
                        /> :
                        <input type="text" {...getInputProps(this.props)} />
                    }
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

  TextInput.defaultProps = {
    placeholder: null,
    hint: null,
    error: null,
    isObligatory: false,
    isMultiline: false,
    onChange: (e) => e
  };

  TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    hint: PropTypes.string,
    error: PropTypes.string,
    isObligatory: PropTypes.bool,
    isMultiline: PropTypes.bool,
    onChange: PropTypes.func
};
