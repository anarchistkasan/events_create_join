import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import style from '~/styles/main.less';

export default class ErrorMessage extends PureComponent {

    render() {
        return (
            <div className={style["error-message"]} message={this.props.message} />
      );
    }
  }

  ErrorMessage.defaultProps = {
    message: "An error occured"
  };

  ErrorMessage.propTypes = {
    message: PropTypes.string
};
