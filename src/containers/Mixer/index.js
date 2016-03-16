/* eslint-disable react/jsx-no-bind */

import 'webrtc-adapter-test';
import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';

import * as mixerActionCreators from './Mixer.creators';
import { connect } from 'react-redux';

import Navbar from '../../common/components/Navbar';

class Mixer extends Component {
  constructor(props) {
    super(props);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.state = {
      audioContext,
      inputNode: null,
      outputNode: audioContext.destination
    };
  }

  render() {
    return (
      <div className="Mixer">
        <Navbar title="Mixer Demo"/>
        <Grid>
          <Col sm={8} smOffset={2}>
            <p>Welcome to the mixer.</p>
          </Col>
        </Grid>
      </div>
    );
  }
}

Mixer.propTypes = {
  delayState: React.PropTypes.object,
  sourceNode: React.PropTypes.string,
  setSourceNode: React.PropTypes.func,
  setBypass: React.PropTypes.func,
  setDelayAmount: React.PropTypes.func,
  setFeedback: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    sourceNode: state.landingPage.sourceNode,
    delayState: state.delay
  };
}

export default connect(
  mapStateToProps,
  Object.assign({}, mixerActionCreators)
)(Mixer);
