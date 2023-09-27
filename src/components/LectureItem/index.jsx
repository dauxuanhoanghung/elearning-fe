import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const LectureItem = (props) => {
  const { id, orderIndex, title } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography color="textSecondary">
          ID: {id} | Order Index: {orderIndex}
        </Typography>
        {/* Add more content or props as needed */}
      </CardContent>
    </Card>
  );
};

export default LectureItem;
