import React, { PureComponent } from 'react';
import style from '~/styles/main.less';

export default class NewEventForm extends PureComponent {
    render() {

        return (
            <header className={style["new-event-header"]}>
                <h1>New event</h1>
            </header>
        );
    }
};