import React from 'react';
import { Typography } from '@mui/material';

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Nitzan Dagan {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}