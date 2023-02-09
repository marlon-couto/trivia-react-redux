import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import configIcon from '../images/config.png';

class Header extends Component {
  render() {
    const { history: { push } } = this.props;

    return (
      <header>
        <nav>
          <Button
            handleClick={ () => push('/Settings') }
            image={ configIcon }
            testId="btn-settings"
          />
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Header);
