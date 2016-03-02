import '../../styles/global/base.scss';
import React, { PropTypes, Component } from 'react';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
    history: PropTypes.object.isRequired,
    routes: PropTypes.array,
    params: PropTypes.object,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
