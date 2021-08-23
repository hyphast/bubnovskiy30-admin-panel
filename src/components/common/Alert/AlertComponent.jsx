import React from 'react';
import {Alert, Snackbar} from '@material-ui/core';

const AlertComponent = ({onClose, open, text, ver, hor, type}) => {
  return (
    <Snackbar anchorOrigin={{vertical: ver, horizontal: hor}}
              open={open}
              autoHideDuration={6000}
              onClose={() => onClose(false)}
    >
      <Alert onClose={() => onClose(false)} severity={type} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;