import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const AllStudentsCard = props => {
  const student = props.student;

  return (
    <Card raised key={student.id} style={{ margin: '1rem' }}>
      <NavLink to={`/students/${student.id}`} key={student.id}>
        <Image centered size="medium" src={student.imageUrl} />
      </NavLink>
      <Card.Content>
        <NavLink to={`/students/${student.id}`} key={student.id}>
          <Card.Header>
            {student.firstName} {student.lastName}
          </Card.Header>
        </NavLink>
      </Card.Content>
      <Card.Content extra>
        <Button
          icon
          onClick={() => {
            props.deleteStudent(student.id);
          }}
        >
          <Icon name="delete" />
        </Button>
      </Card.Content>
    </Card>
  );
};

export default AllStudentsCard;
