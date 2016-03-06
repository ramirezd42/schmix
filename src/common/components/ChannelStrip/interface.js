import React, { Component } from 'react';
import { Knob, Switch, Fader } from '../controls';
import { Row, Col } from 'react-bootstrap';

class ChannelStripInterface extends Component {
  render() {
    return (
      <Row>
        <Col xs={2}>
          <Switch
            label="Mute"
            id="bypass-switch"
            setValue={this.props.setMute}
            value={this.props.mute}
          />
          <Knob
            label="Pan"
            value={this.props.pan}
            setValue={this.props.setPan}
            min={-100}
            max={100}
          />
          <Fader
            value={this.props.gain}
            setValue={this.props.setGain}
            label="Gain"
            min={0}
            max={1}
            step={0.01}
          />
        </Col>
      </Row>
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
