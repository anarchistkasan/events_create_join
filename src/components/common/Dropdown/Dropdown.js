import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from "~/components/common/ErrorMessage/ErrorMessage";

import style from '~/styles/main.less';

const composeItems = (items) => {
    let preparedItems = items.map((item) => {
        return {
            id: item.id,
            name: `${item.name} ${item.lastname}` 
        };
    });

    const currentUser = preparedItems.find((item) => {
        return item.id === 3;
    });

    preparedItems = preparedItems.filter((item) => {
        return item.id !== 3;
    });

    preparedItems.unshift(currentUser);
    return preparedItems;
}
export default class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.items = [];
        this.state = { loading: true};
    }

    componentDidMount() {
        fetch(this.props.url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.setState({ loading: false });
                return response;
            })
            .then(response => response.json())
            .then((items) => {
                if (this.props.label === "Responsible") {
                    this.items = composeItems(items);
                } else {
                    this.items = items;
                }

                })
            .then(data => {
                this.setState({ loading: false })
            });
      }

    render() {
    
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        if (this.items.length === 0) {
            return <div>Empty data</div>
        }

        return (
            <div className={style["input-container"]}>
                <div className={style["input-wrapper"]}>
                    <label>{`${this.props.label}${this.props.isObligatory ? " *" : ""}` }</label>
                    <select
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChange}
                        value={this.props.value}
                    >
                        {this.items.map((item) => (
                            <option key={`${item.id}-${item.name}`} value={item.id}>
                                {item.name}
                            </option>
                            )
                        )}
                         <option value={0}>{this.props.placeholder}</option>
                    </select>
                    <div className={style["dropdown-error-wrapper"]}>
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

  Dropdown.defaultProps = {
    placeholder: null,
    hint: null,
    error: null,
    url: ""
  };

  Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    hint: PropTypes.string,
    error: PropTypes.string,
    isObligatory: PropTypes.bool,
    isMultiline: PropTypes.bool,
    url: PropTypes.string
};
