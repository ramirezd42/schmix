import React from 'react';
import { autobind } from 'core-decorators';

import positionToRadians from './functions/positionToRadians';
import radiansToDegrees from './functions/radiansToDegrees';
import degreesToValue from './functions/degreesToValue';
import valueToDegrees from './functions/valueToDegrees';

const minDegrees = -47;
const maxDegrees = 226;

import styles from './Knob.scss';

class Knob extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      degree: valueToDegrees(
        this.props.value,
        this.props.min,
        this.props.max,
        minDegrees,
        maxDegrees)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this._updateDegrees(nextProps.value);
    }
  }

  @autobind
  handleMouseDown(evt) {
    this.setState({
      mouseDown: true
    });
    this.moveKnobToPoint(evt.target, evt.clientX, evt.clientY);
  }

  @autobind
  handleMouseUp() {
    this.setState({
      mouseDown: false
    });
  }

  @autobind
  handleMouseMove(evt) {
    if (this.state.mouseDown) {
      this.moveKnobToPoint(evt.target, evt.clientX, evt.clientY);
    }
  }

  moveKnobToPoint(elem, x, y) {
    let degrees = radiansToDegrees(positionToRadians(elem, x, y));
    degrees = Math.min(degrees, maxDegrees);
    degrees = Math.max(degrees, minDegrees);

    const value = degreesToValue(degrees, minDegrees, maxDegrees, this.props.min, this.props.max);
    this.setState({
      degree: degrees
    });
    this.props.setValue(parseFloat(value.toFixed(this.props.precision)));
  }

  moveKnobToValue(value) {
    this._updateDegrees(value);
    this.props.setValue(parseFloat(value.toFixed(this.props.precision)));
  }

  _updateDegrees(value) {
    const degrees = valueToDegrees(value, this.props.min, this.props.max, minDegrees, maxDegrees);
    this.setState({
      degree: degrees
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <label>{this.props.label}</label>
        <div className={`${styles.knob} knob`}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        >
          <div className={styles.overlay}></div>
          <div
            className={styles.pointer}
            style={{
              transform: `rotate(${this.state.degree}deg)`
            }}
          >
          </div>
        </div>
        <div className={styles.label}>{this.props.value}</div>
      </div>
    );
  }
}

Knob.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  setValue: React.PropTypes.func.isRequired,
  precision: React.PropTypes.number
};

export default Knob;
