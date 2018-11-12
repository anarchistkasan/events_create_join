import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import style from '~/styles/main.less';

const getInputProps = (props) => {
    return {
        placeholder: props.placeholder,
        onChange: props.onChange,
        value: props.value
    };
};

export default class NumberInputWithText extends PureComponent {
    render() {
        return (
            <div className={style["input-container-text"]}>
                <div className={style["input-wrapper"]}>
                    <label>{this.props.label}</label>
                    <input type="number" {...getInputProps(this.props)} />
                    <span className={style["input-text"]}>{this.props.text}</span>
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

  NumberInputWithText.defaultProps = {
    placeholder: null,
    hint: null,
    error: null,
    text: null
  };

  NumberInputWithText.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    hint: PropTypes.string,
    error: PropTypes.string,
    text: PropTypes.string
};
