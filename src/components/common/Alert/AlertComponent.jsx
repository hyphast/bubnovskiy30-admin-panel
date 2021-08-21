import React from 'react';
import {Alert, Snackbar} from '@material-ui/core';

const AlertComponent = ({setError, error, textError}) => {
  return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={error} autoHideDuration={6000} onClose={() => setError(false)}>
      <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
        {textError}
      </Alert>
    </Snackbar>
  );
};

export default AlertComponent;