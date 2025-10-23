import * as React from 'react';
import { SMCircularProgressStyled } from './SMCircularProgress.Style';
import { CircularProgressProps } from '@mui/material';

const SMCircularProgress: React.FC<CircularProgressProps> = (props) => {
  return <SMCircularProgressStyled {...props} />;
};

export default SMCircularProgress;
