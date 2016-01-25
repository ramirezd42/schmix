import React from 'react';
import Knob from '../../controls/Knob';
import Switch from '../../controls/Switch';
import { Row, Col } from 'react-bootstrap';

class DelayInterface extends React.Component {
  render() {
    return (
      <Row className="delay">
        <Col xs={12}>
          <Switch
            label="Bypass"
            id="bypass-switch"
            value={this.props.bypass}
            setValue={this.props.setBypass}
          />
        </Col>
        <Col xs={6}>
          <Knob
            label="Feedback"
            value={this.props.feedback}
            setValue={this.props.setFeedback}
            min={this.props.feedbackMin}
            max={this.props.feedbackMax}
          />
        </Col>
        <Col xs={6}>
          <Knob
            label="Delay M/S"
            value={this.props.delayAmount}
            setValue={this.props.setDelayAmount}
            min={this.props.delayMin}
            max={this.props.delayMax}
          />
        </Col>
      </Row>
    );
  }
}

DelayInterface.propTypes = {
  bypass: React.PropTypes.bool,
  setBypass: React.PropTypes.func.isRequired,

  setFeedback: React.PropTypes.func.isRequired,
  feedback: React.PropTypes.number,
  feedbackMin: React.PropTypes.number.isRequired,
  feedbackMax: React.PropTypes.number.isRequired,

  setDelayAmount: React.PropTypes.func.isRequired,
  delayAmount: React.PropTypes.number,
  delayMax: React.PropTypes.number.isRequired,
  delayMin: React.PropTypes.number.isRequired,

};

export default DelayInterface;
