import React from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';
import styles from './Switch.scss';

class Switch extends React.Component {
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
          className={styles.switch}
          type="checkbox"
          id={this.props.id}
          checked={this.props.value}
          onClick={this._handleClick}
        >
        </input>
        <label htmlFor={this.props.id}>
          {this.props.label}
          <span className={spanClass}></span>
        </label>
      </div>
    );
  }
}

Switch.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.bool.isRequired,
  setValue: React.PropTypes.func.isRequired
};

export default Switch;
