/* eslint-disable react/prop-types */
import 'webrtc-adapter-test';
import React, { Component } from 'react';
import Delay from '../../common/components/effects/Delay';
import { Navbar, Grid, Col } from 'react-bootstrap';

import * as delayActionCreators from '../../common/components/effects/Delay/Delay.creators';
import { connect } from 'react-redux';

import styles from './LandingPage.scss';

function getFileSourceNode(path, audioContext) {
  const node = audioContext.createBufferSource();
  return fetch(path)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      audioContext.decodeAudioData(buffer, decodedData => {
        node.buffer = decodedData;
        node.loop = true;
      });
      node.start(0);
      return node;
    });
}

function getStreamSourceNode(audioContext) {
  return navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => audioContext.createMediaStreamSource(stream));
}

class LandingPage extends Component {
  constructor(props) {
    super(props);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.state = {
      audioContext,
      inputNode: null,
      outputNode: audioContext.destination
    };
    this.selectSourceNode(props.sourceNode, this.state.audioContext);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sourceNode !== this.props.sourceNode) {
      this.selectSourceNode(nextProps.sourceNode, this.state.audioContext);
    }
  }

  selectSourceNode(name, audioContext) {
    if (name === 'file') {
      getFileSourceNode('https://s3.amazonaws.com/demo-audio/acoustic-guitar.mp3', audioContext)
        .then(node => this.setState({ inputNode: node }));
    } else if (name === 'stream') {
      getStreamSourceNode(audioContext)
        .then(node => this.setState({ inputNode: node }));
    }
  }

  render() {
    return (
      <div className="LandingPage">
        <Navbar className={styles.navbar} fixedTop>
          <Navbar.Brand className={styles.brand}>
            Schmix Audio Effects
          </Navbar.Brand>
        </Navbar>
        <Grid className={styles.content}>
          <Col sm={8} smOffset={2}>
            <h2>Delay Effect</h2>
            <div className={styles.details}>
              <h3>Bypass</h3>
              <p>
                The bypass switch bypasses the effect
                and sends the input signal directly to the output node.
              </p>

              <h3>Feedback</h3>
              <p>
                The feedback node passes the delayed signal back into the delay node at a
                reduced gain inversely proportional to the input value.
              </p>

              <h3>Delay M/S</h3>
              <p>
                The Delay M/S input controls the length in
                milliseconds of the delay applied to the delayed signal.
              </p>
            </div>
            <hr/>
            <Delay
              audioContext={this.state.audioContext}
              inputNode={this.state.inputNode}
              outputNode={this.state.outputNode}
              state={this.props.delayState}
              setBypass={this.props.setBypass}
              setFeedback={this.props.setFeedback}
              setDelayAmount={this.props.setDelayAmount}
            />
          </Col>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sourceNode: state.landingPage.sourceNode,
    delayState: state.delay
  };
}

export default connect(
  mapStateToProps,
  Object.assign({}, delayActionCreators)
)(LandingPage);
