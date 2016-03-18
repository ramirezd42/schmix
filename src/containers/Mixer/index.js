/* eslint-disable react/jsx-no-bind */

import 'webrtc-adapter-test';
import Immutable from 'immutable';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import * as mixerActionCreators from './creators';
import { connect } from 'react-redux';

import Navbar from '../../common/components/Navbar';
import ChannelStrip from '../../common/components/ChannelStrip';
import styles from './Mixer.scss';
import { autobind } from 'core-decorators';

class Mixer extends Component {
  constructor(props) {
    super(props);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.state = {
      audioContext,
      inputNodes: [],
      outputNode: audioContext.destination
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
      bufferSource.start(0);
      this.props.addTrack();
    };
    reader.readAsArrayBuffer(evt.target.files[0]);
  }

  render() {
    return (
    <div>
    <Navbar title="Mixer Demo">
        <div>
          <div className={styles.title}>Mixer Demo</div>
          <input
            className={styles.file}
            type="file"
            accept="audio/*"
            onChange={this.fileChanged}j
          />
        </div>
      </Navbar>
      <div className={styles.container}>
        <div className={styles.channels}>
          {this.props.tracks.map((track, i) => (
            <ChannelStrip
              key={`track_${i}`}
              index={i}

              audioContext={this.state.audioContext}
              inputNode={this.state.inputNodes[i]}
              outputNode={this.state.outputNode}

              gain={track.get('gain')}
              setGain={this.props.setGain}

              mute={track.get('mute')}
              setMute={this.props.setMute}

              pan={track.get('pan')}
              setPan={this.props.setPan}

            />
          ))}
        </div>
        <div className={styles.spacer}/>
      </div>
    </div>
    );
  }
}

Mixer.propTypes = {
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
)(Mixer);
