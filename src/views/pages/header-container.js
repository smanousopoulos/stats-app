import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userOperations } from '../../state/ducks/user';
import Header from '../layout/header';
import Spinner from '../components/spinner';

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.setUserInitial();
  }

  render() {
    const { userId, activeRequests } = this.props;
    const loading = activeRequests > 0;
    return (
      <div>
        <Header userId={userId} />
        <Spinner loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.userId,
  activeRequests: state.common.activeRequests,
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
  activeRequests: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
