import React from 'react';
import ChannelStripInterface from './interface';
import AudioRouter from '../AudioRouter';
import { connect } from 'react-redux';
import * as creators from './creators';

class ChannelStrip extends AudioRouter {
  constructor(props) {
    super(props);
    this.gainNode = props.audioContext.createGain();
    this.gainNode.gain.value = props.state.gain;

    this.panNode = props.audioContext.createGain();

    this.gainNode.connect(this.panNode);
  }

  connectInput(inputNode) {
    inputNode.connect(this.gainNode);
  }

  connectToOutput(outputNode) {
    this.panNode.disconnect();
    this.panNode.connect(outputNode);
  }

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
  audioContext: React.PropTypes.object,
  inputNode: React.PropTypes.object,
  outputNode: React.PropTypes.object,
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

ChannelStrip.gainNode = null;
ChannelStrip.panNode = null;

export default connect(
  mapStateToProps,
  creators
)(ChannelStrip);
