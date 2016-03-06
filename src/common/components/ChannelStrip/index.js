import React, { Component } from 'react';
import ChannelStripInterface from './interface';
import { connect } from 'react-redux';
import * as creators from './creators';

class ChannelStrip extends Component {
  render() {
    return (
      <ChannelStripInterface
        gain={this.props.gain}
        setGain={this.props.setGain}

        pan={this.props.pan}
        setPan={this.props.setPan}

        mute={this.props.mute}
        setMute={this.props.setMute}
      />
    );
  }
}

ChannelStrip.propTypes = {
  gain: React.PropTypes.number,
  setGain: React.PropTypes.func,

  pan: React.PropTypes.number,
  setPan: React.PropTypes.func,

  mute: React.PropTypes.bool,
  setMute: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    gain: state.channelStrip.gain,
    pan: state.channelStrip.pan,
    mute: state.channelStrip.mute
  };
}

export default connect(
  mapStateToProps,
  creators
)(ChannelStrip);
