import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sessionActions } from '../../state/ducks/session';
import NewSessionForm from '../components/new-session-form';

function onCreateSession(props) {
  const courseId = props.match.params.courseId;
  console.log(courseId);

  props.history.push(`/${courseId}/in-progress`);
}

const NewSessionPage = (props) => (
  <div className="new-session-page">
    <NewSessionForm
      questions={props.questionsNumber}
      difficulty={props.difficulty}
      onQuestionsChanged={(val) => props.actions.setQuestionsNumber(val)}
      onDifficultyChanged={(val) => props.actions.setDifficultyLevel(val)}
      onCreate={() => onCreateSession(props)}
    />
  </div>
);

const mapStateToProps = (state) => ({
  questionsNumber: state.session.questionsNumber,
  difficulty: state.session.difficulty,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setQuestionsNumber: sessionActions.setQuestionsNumber,
      setDifficultyLevel: sessionActions.setDifficultyLevel,
    }, dispatch),
  };
};

NewSessionPage.propTypes = {
  questionsNumber: PropTypes.number,
  difficulty: PropTypes.string,
  actions: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewSessionPage);
