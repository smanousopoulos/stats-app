import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userOperations } from '../../state/ducks/user';
import Header from '../layout/header';

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.setUserInitial();
  }

  render() {
    const { userId } = this.props;
    return (
      <Header userId={userId} />
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setUserInitial: userOperations.setUserInitial,
    }, dispatch)
  };
};

HeaderContainer.propTypes = {
  actions: PropTypes.object,
  userId: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
