import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = (props) => (
  <div className="sidebar">
    { props.children }
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Sidebar;