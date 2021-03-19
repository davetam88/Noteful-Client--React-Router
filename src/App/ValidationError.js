import React from 'react';
import PropTypes from 'prop-types';

export default function ValidationError(props) {
  if (props.message)
  {
    return (
      <div style={{
        fontSize: 14, color: "red", paddingBottom: "10px"
      }
      }> { props.message}</div >
    );
  }
  return <></>
}

ValidationError.propType = {
  message: PropTypes.string,
};


