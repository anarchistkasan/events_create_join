import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import style from '~/styles/main.less';

export default class EventSection extends PureComponent {
    render() {
        return (
            <div className={style["event-section"]}>
                <header className={style["event-section-header"]}>
                  <h2>{this.props.header}</h2>
                </header>
                <section className={style["section-items"]}>
                    {this.props.children}
                </section>
            </div>
      );
    }
  }

  EventSection.defaultProps = {
    children: null
  };

  EventSection.propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.node
};
