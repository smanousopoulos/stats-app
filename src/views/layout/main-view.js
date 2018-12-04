import React from 'react';
import PropTypes from 'prop-types';

const MainView = (props) => (
  <div className="main-view">
    { props.children }
  </div>
);

MainView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default MainView;