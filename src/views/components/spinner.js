import React from 'react';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  return (
    <div>
      {
        props.loading
        && (
          <div className="spinner">
            <i className="fa fa-spinner fa-spin fa-4x fa-fw"/>
          </div>
        )
      }
    </div>
  );
};

Spinner.propTypes = {
  loading: PropTypes.bool,
};

export default Spinner;
