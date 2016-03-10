import React, { Component } from 'react';
class AudioContainer extends Component {
  constructor(props) {
    super(props);
    this.initializeAudioNodes(props);

    if (props.inputNode) {
      this.connectInput(props.inputNode);
    }

    if (props.outputNode) {
      this.connectToOutput(props.outputNode);
    }

    if (typeof this.initializeAudioNodes !== 'function') {
      throw new TypeError('Must provide initializeAudioNodes() implementation');
    }

    if (typeof this.connectInput !== 'function') {
      throw new TypeError('Must provide connectInput() implementation');
    }

    if (typeof this.connectToOutput !== 'function') {
      throw new TypeError('Must provide connectToOutput() implementation');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.inputNode !== nextProps.inputNode) {
      if (this.props.inputNode) {
        this.props.inputNode.disconnect();
      }
      this.connectInput(nextProps.inputNode, this.props.inputNode);
    }
    if (this.props.outputNode !== nextProps.outputNode) {
      this.connectToOutput(nextProps.outputNode);
    }
  }
}

AudioContainer.propTypes = {
  inputNode: React.PropTypes.object,
  outputNode: React.PropTypes.object,
};

export default AudioContainer;
