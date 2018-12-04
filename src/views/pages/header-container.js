import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userOperations } from '../../state/ducks/user';

const WrapperPage = ({ children }) => {
  return (
    <div className="main-view">
      { children }
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.user.userId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setUser: userOperations.setUserInitial,
    }, dispatch)
  };
};

WrapperPage.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(WrapperPage);
