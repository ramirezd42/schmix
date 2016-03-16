import styles from './Navbar.scss';
import React, { Component } from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';

class Navbar extends Component {
  render() {
    return (
      <BootstrapNavbar className={styles.navbar} fixedTop>
        <BootstrapNavbar.Brand className={styles.brand}>
          {this.props.title}
        </BootstrapNavbar.Brand>
      </BootstrapNavbar>
    );
  }
}

Navbar.propTypes = {
  title: React.PropTypes.string
};

export default Navbar;
