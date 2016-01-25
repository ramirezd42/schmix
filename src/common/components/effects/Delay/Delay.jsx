import React from 'react';
import AudioEffect from '../AudioEffect';
import DelayInterface from './DelayInterface';
class Delay extends AudioEffect {

  componentDidMount() {
    this.initializeAudioNodes();
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (this.props.state.delayAmount !== nextProps.state.delayAmount) {
      this.delayNode.delayTime.value = nextProps.state.delayAmount / 1000;
    }
    if (this.props.state.feedback !== nextProps.state.feedback) {
      this.feedbackNode.gain.value = nextProps.state.feedback / 100;
    }
    if (this.props.state.bypass !== nextProps.state.bypass) {
      this.bypassNode.gain.value = !nextProps.state.bypass ? 1 : 0;
    }
  }

  // TODO: figure out what part of the component lifecycle this should be called during
  initializeAudioNodes() {
    // setup nodes
    this.delayNode = this.props.audioContext.createDelay(128);
    this.feedbackNode = this.props.audioContext.createGain();
    this.bypassNode = this.props.audioContext.createGain();
    this.masterNode = this.props.audioContext.createGain();

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
