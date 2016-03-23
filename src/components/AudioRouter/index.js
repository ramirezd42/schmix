import React, { Component } from 'react';
class AudioRouter extends Component {
  constructor(props) {
    super(props);

    if (props.inputNode) {
      this.props.connectInput(props.inputNode);
    }

    if (props.outputNode) {
      this.props.connectToOutput(props.outputNode);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.inputNode !== nextProps.inputNode) {
      if (this.props.inputNode) {
        this.props.inputNode.disconnect();
      }
      this.props.connectInput(nextProps.inputNode, this.props.inputNode);
    }
    if (this.props.outputNode !== nextProps.outputNode) {
      this.props.connectToOutput(nextProps.outputNode);
    }
  }

  render() {
    return (
      this.props.children
    );
  }
}

AudioRouter.propTypes = {
  inputNode: React.PropTypes.object,
  outputNode: React.PropTypes.object,
  children: React.PropTypes.element.isRequired,
  connectInput: React.PropTypes.func.isRequired,
  connectToOutput: React.PropTypes.func.isRequired
};

export default AudioRouter;
