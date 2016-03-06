import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import ReactSlider from 'react-slider';

import styles from './Fader.scss';

class Fader extends Component {
  @autobind
  render() {
    return (
      <div className={styles.container}>
        <label>{this.props.label}</label>
        <div className={styles.control}>
          <ReactSlider
            className={styles.fader}
            handleClassName={styles.handle}
            handleActiveClassName={styles.active}
            onChange={this.props.setValue}
            orientation="vertical"
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            value={this.props.value}
            invert
          />
        </div>
        <div>{this.props.value}</div>
      </div>
    );
  }
}

Fader.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.number.isRequired,
  setValue: React.PropTypes.func.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number
};

export default Fader;
