import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const NewSessionPrompt = (props) => {
  const { onClick } = props;
  return (
    <div className="new-session-prompt">
      <h3>Ready for a new session?</h3>

      <Button
        color="primary"
        size="lg"
        onClick={onClick}
      >
        Start
      </Button>
    </div>
  );
};

NewSessionPrompt.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NewSessionPrompt;