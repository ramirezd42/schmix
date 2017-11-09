/* eslint-disable react/jsx-no-bind */
const { NodeAudio, SoundBuffer, StereoPannerNode, PluginNode, GainNode } = require('node-audio')
const fs = require('fs')

import Immutable from 'immutable';
import React, { Component } from 'react';
import Mixer from '../../components/Mixer';

import * as mixerActionCreators from './creators';
import { connect } from 'react-redux';

import Navbar from '../../components/Navbar';
import styles from './Schmix.scss';
import { autobind } from 'core-decorators';

const pluginDir = '/Library/Audio/Plug-Ins/VST3'

const buildBuffers = (audioContext, files) => 
  files.map((file) => new SoundBuffer( file, audioContext.sampleRate()))

const buildInputNodes = (audioContext, files) => 
  files.map(() => new GainNode(audioContext.sampleRate()))

class Schmix extends Component {
  constructor(props) {
    super(props);
    const audioContext = NodeAudio.makeAudioContext()
    this.state = {
      audioContext,
      inputNodes: [],
      bufferNodes: [],
      outputNode: audioContext.destination(),
      files: [],
      bufferSources: [],
      availablePlugins: [],
      selectedPlugins: []
    };
  }

  componentDidMount() {
    fs.readdir(pluginDir, (err, files) => {
      console.log(files)
      const pluginDescriptors = files.map(f =>({name: f, path: `${pluginDir}/${f}`}))
      this.setState(previousState => ({availablePlugins: pluginDescriptors}))
    })
  }

  @autobind
  fileChanged(evt) {
    const { audioContext } = this.state
    const filePath = evt.target.files[0].path 

    this.setState(previousState => ({ files: previousState.files.concat(filePath)}));
    this.props.addTrack();
  }

  @autobind
  startPlayback() {
    const bufferSources = buildBuffers(this.state.audioContext, this.state.files)
    this.setState(state => ({bufferSources}))

    const inputNodes = buildInputNodes(this.state.audioContext, this.state.files)
    this.setState(state => ({inputNodes}))

    bufferSources.forEach((buffer, i) => buffer.playOnNode(
      this.state.audioContext,
      inputNodes[i],
      0
    ));
  }

  @autobind
  stopPlayback() {
    const inputNodes = buildInputNodes(this.state.audioContext, this.state.files)
    this.setState(state => ({inputNodes}))
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
          <div className={styles.buttonOuter}
            onClick={this.startPlayback}
          >
            <div className={styles.playButton}> </div>
          </div>

          <div className={styles.buttonOuter}
            onClick={this.stopPlayback}
          >
            <div className={styles.stopButton}> </div>
          </div>

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

            availablePlugins={this.state.availablePlugins}
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
