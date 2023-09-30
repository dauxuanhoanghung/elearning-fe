import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/**
 * 
 * @param {id, orderIndex, title, content, type, videos} props 
 * @returns 
 */
const LectureItem = (props) => {
  const { id, orderIndex, title } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography color="textSecondary">
          ID: {id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LectureItem;
