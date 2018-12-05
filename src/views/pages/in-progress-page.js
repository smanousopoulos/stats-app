import React from 'react';
import QuestionsList from '../components/questions-list';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sessionActions, sessionOperations } from '../../state/ducks/session';


function onComplete(props) {
  const courseId = props.match.params.courseId;
  props.actions.sendAnswers(courseId).then(() => {
    props.history.push(`/${courseId}`);
  });
}

class InProgressPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { questionsNumber, difficulty, match } = this.props;
    const courseId = match.params.courseId;

    this.props.actions.fetchQuestions(courseId, questionsNumber, difficulty)
      .then(() => this.props.actions.startSessionTimer());
  }

  render() {
    const { questions, actions } = this.props;
    return (
      <div className="in-progress-page">
        <QuestionsList
          questions={questions}
          onQuestionAnswered={(id, value) => actions.updateQuestion(id, value)}
          onComplete={() => onComplete(this.props)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionsNumber: state.session.questionsNumber,
  difficulty: state.session.difficulty,
  questions: state.session.questions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      fetchQuestions: sessionOperations.fetchQuestions,
      sendAnswers: sessionOperations.sendAnswers,
      updateQuestion: sessionActions.updateQuestion,
      resetSession: sessionActions.resetSession,
      startSessionTimer: sessionActions.startSessionTimer,
    }, dispatch),
  };
};

InProgressPage.propTypes = {
  questionsNumber: PropTypes.number,
  difficulty: PropTypes.string,
  questions: PropTypes.array,
  actions: PropTypes.object,
  match: PropTypes.object,
  fetchQuestions: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(InProgressPage);
