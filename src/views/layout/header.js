import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'reactstrap';

const Header = () => (
  <Navbar>
    <NavLink to="/">
      <h4>Courses</h4>
    </NavLink>
  </Navbar>
);

export default Header;
