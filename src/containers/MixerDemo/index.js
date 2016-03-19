/* eslint-disable react/jsx-no-bind */

import 'webrtc-adapter-test';
import Immutable from 'immutable';
import React, { Component } from 'react';

import * as mixerActionCreators from './creators';
import { connect } from 'react-redux';

import Navbar from '../../common/components/Navbar';
import ChannelStrip from '../../common/components/ChannelStrip';
import styles from './Mixer.scss';

class Mixer extends Component {
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

                audioContext={this.props.audioContext}
                inputNode={this.props.inputNodes[i]}
                outputNode={this.props.outputNode}

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
  inputNodes: React.PropTypes.array,
  outputNode: React.PropTypes.object,
  audioContext: React.PropTypes.object,
  addTrack: React.PropTypes.func,

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
