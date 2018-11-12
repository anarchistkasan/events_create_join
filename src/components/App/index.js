import React, { PureComponent } from 'react';
import style from '~/styles/main.less';
import NewEventForm from '~/components/NewEventForm/NewEventForm';

export default class App extends PureComponent {
  render() {
    return (
      <div className={style["application-wrapper"]}>
        <NewEventForm />
      </div>
    );
  }
}
