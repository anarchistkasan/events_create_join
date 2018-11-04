import React, { PureComponent } from 'react';
import style from '~/styles/main.less';

export default class App extends PureComponent {
  render() {
    return (
      <div className={style.header}>
        <h1>My header</h1>
        <p>trying set up out</p>
      </div>
    );
  }
}
