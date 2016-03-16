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
  audioContext: React.PropTypes.object.isRequired,
  inputNode: React.PropTypes.object,
  outputNode: React.PropTypes.object,
  gain: React.PropTypes.number.isRequired,
  setGain: React.PropTypes.func.isRequired,

  pan: React.PropTypes.number.isRequired,
  setPan: React.PropTypes.func.isRequired,

  mute: React.PropTypes.bool.isRequired,
  setMute: React.PropTypes.func.isRequired
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
