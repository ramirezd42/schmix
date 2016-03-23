import React, { Component } from 'react';
import { Knob, Switch, Fader } from '../controls';
import styles from './ChannelStrip.scss';

class ChannelStripInterface extends Component {
  render() {
    return (
        <div className={styles.container}>
          <Switch
            label="Mute"
            setValue={this.props.setMute}
            value={this.props.mute}
          />
          <Knob
            label="Pan"
            value={this.props.pan}
            setValue={this.props.setPan}
            min={-1}
            max={1}
            precision={2}
          />
          <Fader
            value={this.props.gain}
            setValue={this.props.setGain}
            label="Gain"
            min={0}
            max={1}
            step={0.01}
          />
      </div>
    );
  }
}

ChannelStripInterface.propTypes = {
  gain: React.PropTypes.number,
  setGain: React.PropTypes.func,

  pan: React.PropTypes.number,
  setPan: React.PropTypes.func,

  mute: React.PropTypes.bool,
  setMute: React.PropTypes.func
};

export default ChannelStripInterface;
