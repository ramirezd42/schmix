import React from 'react';
import AudioContainer from '../../AudioContainer';
import DelayInterface from './DelayInterface';
class Delay extends AudioContainer {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    this.delayNode.delayTime.value = nextProps.state.delayAmount / 1000;
    this.feedbackNode.gain.value = nextProps.state.feedback / 100;
    this.bypassNode.gain.value = !nextProps.state.bypass ? 1 : 0;
  }

  // TODO: figure out what part of the component lifecycle this should be called during
  initializeAudioNodes(props) {
    // setup nodes
    this.delayNode = props.audioContext.createDelay(128);
    this.delayNode.delayTime.value = props.state.delayAmount / 1000;

    this.feedbackNode = props.audioContext.createGain();
    this.feedbackNode.gain.value = props.state.feedback / 100;

    this.bypassNode = props.audioContext.createGain();
    this.bypassNode.gain.value = props.state.bypass / 100;
    this.masterNode = props.audioContext.createGain();

  // wire up nodes
    this.delayNode.connect(this.feedbackNode);
    this.feedbackNode.connect(this.delayNode);
    this.delayNode.connect(this.bypassNode);
    this.bypassNode.connect(this.masterNode);
  }

  connectInput(inputNode) {
    inputNode.connect(this.delayNode);
    inputNode.connect(this.masterNode);
  }

  connectToOutput(outputNode) {
    this.masterNode.disconnect();
    this.masterNode.connect(outputNode);
  }

  render() {
    return (
      <DelayInterface
        bypass={this.props.state.bypass} setBypass={this.props.setBypass}
        feedback={this.props.state.feedback} setFeedback={this.props.setFeedback}
        feedbackMin={0} feedbackMax={100}
        delayAmount={this.props.state.delayAmount} setDelayAmount={this.props.setDelayAmount}
        delayMin={0} delayMax={1000}
      />
    );
  }
}

Delay.propTypes = {
  state: React.PropTypes.shape({
    bypass: React.PropTypes.bool,
    feedback: React.PropTypes.number,
    delayAmount: React.PropTypes.number
  }),
  audioContext: React.PropTypes.object.isRequired,
  setBypass: React.PropTypes.func.isRequired,
  setFeedback: React.PropTypes.func.isRequired,
  setDelayAmount: React.PropTypes.func.isRequired
};

Delay.delayNode = null;
Delay.feedbackNode = null;
Delay.bypassNode = null;
Delay.masterNode = null;

export default Delay;
