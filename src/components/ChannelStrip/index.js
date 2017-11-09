import React, { Component } from 'react';
import ChannelStripInterface from './interface';
import AudioRouter from '../AudioRouter';
import { GainNode, StereoPannerNode, PluginNode } from 'node-audio'
import { autobind } from 'core-decorators';

class ChannelStrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlugins: [],
      pluginNodes: [],
      pluginInputNodes: []
    }

    this.setGain = value => props.setGain(this.props.index, value);
    this.setPan = value => props.setPan(this.props.index, value);
    this.setMute = value => props.setMute(this.props.index, value);

    this.gainNode = new GainNode(this.props.audioContext.sampleRate())
    this.gainNode.gain().setValue(props.gain);

    this.panNode = new StereoPannerNode(this.props.audioContext.sampleRate())
    this.panNode.pan().setValue(props.pan);

    this.muteNode = new GainNode(this.props.audioContext.sampleRate())
    this.muteNode.gain().setValue(props.mute ? 0 : 1);

    this.outputNode = new GainNode(this.props.audioContext.sampleRate())

    this.gainNode.connect(this.props.audioContext, this.panNode, 0, 0);
    this.panNode.connect(this.props.audioContext, this.muteNode, 0, 0);
    this.muteNode.connect(this.props.audioContext, this.outputNode, 0, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.gainNode.gain().setValue(nextProps.gain);
    this.muteNode.gain().setValue(nextProps.mute ? 0 : 1);
    this.panNode.pan().setValue(nextProps.pan);
  }

  @autobind
  connectInput(inputNode) {
    inputNode.connect(this.props.audioContext, this.gainNode, 0, 0);
  }

  @autobind
  connectToOutput(outputNode) {
    this.outputNode.disconnect(this.props.audioContext, 0);
    this.outputNode.connect(this.props.audioContext, this.props.outputNode, 0, 0);
  }

  @autobind
  addPlugin(pluginDescriptor) {
    const { audioContext } = this.props
    console.log(JSON.stringify(pluginDescriptor))
    const pluginNode = new PluginNode(pluginDescriptor.path, audioContext.sampleRate())
    const panNode = new StereoPannerNode(audioContext.sampleRate())
    this.setState(prev => ({
      selectedPlugins: prev.selectedPlugins.concat([pluginDescriptor]),
      pluginNodes: prev.pluginNodes.concat([pluginNode]),
      pluginInputNodes: prev.panNodes.concat([panNode]),
    }))

    this.muteNode.disconnect(audioContext, 0) 
    this.muteNode.connect(audioContext, panNode, 0, 0) 
    panNode.connect(audioContext, pluginNode, 0, 0)
    pluginNode.connect(audioContext, this.outputNode, 0 ,0)
  }

  render() {
    return (
      <AudioRouter
        inputNode={this.props.inputNode}
        outputNode={this.props.outputNode}
        connectInput={this.connectInput}
        connectToOutput={this.connectToOutput}
        audioContext={this.props.audioContext}
      >
        <ChannelStripInterface
          gain={this.props.gain}
          setGain={this.setGain}

          pan={this.props.pan}
          setPan={this.setPan}

          mute={this.props.mute}
          setMute={this.setMute}

          availablePlugins={this.props.availablePlugins}
          selectedPlugins={this.state.selectedPlugins}
          addPlugin={this.addPlugin}
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
  setMute: React.PropTypes.func,

  availablePlugins: React.PropTypes.array
};

ChannelStrip.gainNode = null;
ChannelStrip.panNode = null;
ChannelStrip.muteNode = null;

export default ChannelStrip;
