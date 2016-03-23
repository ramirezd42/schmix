/* eslint-disable react/jsx-no-bind */

import 'webrtc-adapter-test';
import Immutable from 'immutable';
import React, { Component } from 'react';

import ChannelStrip from '../ChannelStrip';
import styles from './Mixer.scss';

class Mixer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    );
  }
}

Mixer.propTypes = {
  tracks: React.PropTypes.instanceOf(Immutable.List),
  audioContext: React.PropTypes.object.isRequired,
  inputNodes: React.PropTypes.array,
  outputNode: React.PropTypes.object,

  setGain: React.PropTypes.func,
  setPan: React.PropTypes.func,
  setMute: React.PropTypes.func
};

export default Mixer;
