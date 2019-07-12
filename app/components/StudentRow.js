import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';

const StudentRow = props => {
  return (
    <Card color="blue">
      <NavLink to={`/students/${props.student.id}`}>
        <Image fluid src={props.student.imageUrl} />
      </NavLink>
      <Card.Header as="h3">
        {props.student.firstName} {props.student.lastName}
      </Card.Header>
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
    </Card>
  );
};

export default StudentRow;
