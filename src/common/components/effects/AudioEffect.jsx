import React from 'react';
class AudioEffect extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.inputNode !== nextProps.inputNode) {
      this.connectInput(nextProps.inputNode);
    }
    if (this.props.outputNode !== nextProps.outputNode) {
      this.connectToOutput(nextProps.outputNode);
    }
  }
  constuctor() {
    if (typeof this.connectInput !== 'function') {
      throw new TypeError('Must provide connectInput() implementation');
    }
    if (typeof this.connectToOutput !== 'function') {
      throw new TypeError('Must provide connectToOutput() implementation');
    }
  }
}

AudioEffect.propTypes = {
  inputNode: React.PropTypes.object,
  outputNode: React.PropTypes.object,
};

export default AudioEffect;
