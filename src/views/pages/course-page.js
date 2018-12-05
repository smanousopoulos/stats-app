import React from 'react';
import PropTypes from 'prop-types';
import NewSessionPrompt from '../components/new-session-prompt';
import CourseAggregateDisplay from '../components/course-aggregate';
import { courseOperations } from '../../state/ducks/course';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function onStartClick(props) {
  const courseId = props.match.params.courseId;
  props.history.push(`/${courseId}/new`);
}

class CoursePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('cmoponent mounted');
    const { actions, match } = this.props;
    const { courseId } = match.params;
    actions.fetchCourseAggregate(courseId);
  }

  componentDidUpdate(prevProps) {
    const prevCourseId = prevProps.match.params.courseId;
    const courseId = this.props.match.params.courseId;

    if (prevCourseId !== courseId) {
      this.props.actions.fetchCourseAggregate(courseId);
    }
  }

  render() {
    const { aggregate, match } = this.props;
    return (
      <div>
        {
          !match.params.courseId ? (
            <h3>Start by selecting a course on the menu</h3>
          ) : (
            <div>
              <NewSessionPrompt
                onClick={() => onStartClick(this.props)}
              />

              <div>
                <CourseAggregateDisplay
                  values={aggregate}
                />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  aggregate: state.course.aggregate,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      fetchCourseAggregate: courseOperations.fetchCourseAggregate,
    }, dispatch),
  };
};

CoursePage.propTypes = {
  match: PropTypes.object,
  actions: PropTypes.object,
  aggregate: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
