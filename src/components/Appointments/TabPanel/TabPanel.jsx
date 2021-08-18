import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export const TabPanel = ({ children, value, index, ...other }) => {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}