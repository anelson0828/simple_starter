import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';

export const StudentRow = props => {
  return (
    <Card fluid color="blue">
      <NavLink to={`/students/${props.student.id}`}>
        <Card.Header>
          {props.student.firstName} {props.student.lastName}
        </Card.Header>
        <Card.Image size="small" src={props.student.imageUrl} />
        <Button
          onClick={() => {
            props.removeStudentFromCampus({
              id: props.student.id,
              campusId: null,
            });
          }}
        >
          Unregister
        </Button>
      </NavLink>
    </Card>
  );
};
