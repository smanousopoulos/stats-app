import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'reactstrap';

const Header = ({ userId }) => (
  <Navbar>
    <NavLink to="/">
      <h4>Courses</h4>
    </NavLink>

    {
      userId != null ? (
        <span>{userId}</span>
      ) : <div/>
    }
  </Navbar>
);

Header.propTypes = {
  userId: PropTypes.string,
};

export default Header;
