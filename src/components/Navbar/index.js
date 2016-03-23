import styles from './Navbar.scss';
import React, { Component } from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';

class Navbar extends Component {
  render() {
    return (
      <BootstrapNavbar className={styles.navbar} fixedTop>
        <BootstrapNavbar.Brand className={styles.brand}>
          {this.props.children}
        </BootstrapNavbar.Brand>
      </BootstrapNavbar>
    );
  }
}

Navbar.propTypes = {
  children: React.PropTypes.element
};

export default Navbar;
