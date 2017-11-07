/* eslint-disable react/jsx-no-bind */
const { NodeAudio, SoundBuffer, StereoPannerNode, PluginNode } = require('node-audio')
import Immutable from 'immutable';
import React, { Component } from 'react';
import Mixer from '../../components/Mixer';

import * as mixerActionCreators from './creators';
import { connect } from 'react-redux';

import Navbar from '../../components/Navbar';
import styles from './Schmix.scss';
import { autobind } from 'core-decorators';

class Schmix extends Component {
  constructor(props) {
    super(props);
    const audioContext = NodeAudio.makeAudioContext()
    this.state = {
      audioContext,
      inputNodes: [],
      bufferNodes: [],
      outputNode: audioContext.destination(),
      bufferSources: []
    };
  }

  @autobind
  fileChanged(evt) {
    const { audioContext } = this.state
    const bufferSource = new SoundBuffer(
      evt.target.files[0].path,
      audioContext.sampleRate()
    )
    const pluginNode = new PluginNode('/Library/Audio/Plug-Ins/VST3/PrimeEQ.vst3', audioContext.sampleRate())
    const inputNode = new StereoPannerNode(audioContext.sampleRate())
    inputNode.connect(audioContext, pluginNode, 0, 0)

    this.setState(previousState => ({ inputNodes: previousState.inputNodes.concat(pluginNode)}));
    this.setState(previousState => ({ bufferNodes: previousState.bufferNodes.concat(inputNode)}));
    this.setState(previousState => ({ bufferSources: previousState.bufferSources.concat(bufferSource)}));
    this.props.addTrack();
  }

  @autobind
  playBuffers() {
    this.state.bufferSources.forEach((buffer, i) => buffer.playOnNode(
      this.state.audioContext,
      this.state.bufferNodes[i],
      0
    ));
  }

  render() {
    return (
      <div>
        <Navbar>
          <div className={styles.brand}>
            <div className={styles.title}>Schmix-Test</div>
            <input
              className={styles.file}
              type="file"
              accept="audio/*"
              onChange={this.fileChanged}j
            />
          </div>
          <button
            className={styles.play}
            type="button"
            onClick={this.playBuffers}
          > Play
          </button>
        </Navbar>
        <div className={styles.container}>
          <Mixer
            tracks = {this.props.tracks}
            inputNodes = {this.state.inputNodes}
            outputNode = {this.state.outputNode}
            audioContext = {this.state.audioContext}
            addTrack = {this.props.addTrack}

            setGain = {this.props.setGain}
            setPan = {this.props.setPan}
            setMute = {this.props.setMute}
          />
          <div className={styles.spacer}/>
        </div>
      </div>
    );
  }
}

Schmix.propTypes = {
  tracks: React.PropTypes.instanceOf(Immutable.List),
  addTrack: React.PropTypes.func,

  sourceNode: React.PropTypes.string,
  setSourceNode: React.PropTypes.func,

  setGain: React.PropTypes.func,
  setPan: React.PropTypes.func,
  setMute: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    tracks: state.tracks
  };
}

export default connect(
  mapStateToProps,
  Object.assign({}, mixerActionCreators)
)(Schmix);
