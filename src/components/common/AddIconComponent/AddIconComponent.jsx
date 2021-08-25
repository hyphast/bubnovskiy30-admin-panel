import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const AddIconComponent = ({onClick, className}) => {

  return (
    <Fab onClick={onClick} className={className} color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );
};

export default AddIconComponent;