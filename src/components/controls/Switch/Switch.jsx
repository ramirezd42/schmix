import Guid from 'guid';
import React from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';
import styles from './Switch.scss';

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Guid.create().value
    };
  }

  @autobind
  _handleClick() {
    this.props.setValue(!this.props.value);
  }

  render() {
    const spanClass = classNames({
      [styles.body]: true,
      [styles.active]: this.props.value,
    });
    return (
      <div className={styles.container}>
        <input
          id={this.state.id}
          className={styles.switch}
          type="checkbox"
          checked={this.props.value}
          onClick={this._handleClick}
        >
        </input>
        <label htmlFor={this.state.id} className={styles.label}>
          {this.props.label}
          <span className={spanClass}></span>
        </label>
      </div>
    );
  }
}

Switch.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.bool.isRequired,
  setValue: React.PropTypes.func.isRequired
};

export default Switch;
