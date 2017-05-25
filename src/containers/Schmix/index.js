/* eslint-disable react/jsx-no-bind */

import 'webrtc-adapter-test';
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
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.state = {
      audioContext,
      inputNodes: [],
      outputNode: audioContext.destination,
      bufferSources: []
    };
  }

  @autobind
  fileChanged(evt) {
    const bufferSource = this.state.audioContext.createBufferSource();
    const reader = new FileReader();
    reader.onload = (_evt) => {
      this.state.audioContext.decodeAudioData(_evt.target.result, (buffer) => {
        bufferSource.buffer = buffer;
      });
      this.setState({ inputNodes: this.state.inputNodes.concat([bufferSource]) });
      this.state.bufferSources.push(bufferSource);
      // bufferSource.start(0);
      this.props.addTrack();
    };
    reader.readAsArrayBuffer(evt.target.files[0]);
  }

  @autobind
  playBuffers() {
    this.state.bufferSources.forEach(source => source.start(0));
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
