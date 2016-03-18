import React, { Component } from 'react';
import ChannelStripInterface from './interface';
import AudioRouter from '../AudioRouter';
import { autobind } from 'core-decorators';

class ChannelStrip extends Component {
  constructor(props) {
    super(props);

    this.setGain = value => props.setGain(this.props.index, value);
    this.setPan = value => props.setPan(this.props.index, value);
    this.setMute = value => props.setMute(this.props.index, value);

    this.gainNode = props.audioContext.createGain();
    this.gainNode.gain.value = props.gain;

    this.panNode = props.audioContext.createGain();

    this.muteNode = props.audioContext.createGain();
    // this.muteNode.gain.value = props.mute ? 0 : 1;

    this.gainNode.connect(this.panNode);
    this.panNode.connect(this.muteNode);
  }

  componentWillReceiveProps(nextProps) {
    this.gainNode.gain.value = nextProps.gain;
    // this.muteNode.gain.value = nextProps.mute ? 0 : 1;
  }

  @autobind
  connectInput(inputNode) {
    inputNode.connect(this.gainNode);
  }

  @autobind
  connectToOutput(outputNode) {
    this.muteNode.disconnect();
    this.muteNode.connect(outputNode);
  }

  render() {
    return (
      <AudioRouter
        inputNode={this.props.inputNode}
        outputNode={this.props.outputNode}
        connectInput={this.connectInput}
        connectToOutput={this.connectToOutput}
      >
        <ChannelStripInterface
          gain={this.props.gain}
          setGain={this.setGain}

          pan={this.props.pan}
          setPan={this.setPan}

          mute={this.props.mute}
          setMute={this.setMute}
        />
    </AudioRouter>
    );
  }
}

ChannelStrip.propTypes = {
  index: React.PropTypes.number.isRequired,
  audioContext: React.PropTypes.object.isRequired,
  inputNode: React.PropTypes.object,
  outputNode: React.PropTypes.object,
  gain: React.PropTypes.number.isRequired,
  setGain: React.PropTypes.func,

  pan: React.PropTypes.number.isRequired,
  setPan: React.PropTypes.func,

  mute: React.PropTypes.bool.isRequired,
  setMute: React.PropTypes.func
};

ChannelStrip.gainNode = null;
ChannelStrip.panNode = null;
ChannelStrip.muteNode = null;

export default ChannelStrip;
