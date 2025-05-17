import React from 'react';
import UserStore from '../../store/UserStore';

const SubmitButton = (props) => {
  let { isFormSubmit } = UserStore();

  if (!isFormSubmit) {
    return (
      <button onClick={props.onClick} type="submit" className={props.className}>
        {props.text}
      </button>
    );
  } else {
    return (
      <button disabled={true} className={props.className}>
        <div className="spinner-border spinner-border-sm me-2" role="status" />
        Processing...
      </button>
    );
  }
};

export default SubmitButton;

