import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const CampusCard = props => {
  const campus = props.campus;

  return (
    <Card
      className="centered"
      raised
      key={campus.id}
      style={{ margin: '1rem' }}
    >
      <NavLink to={`/campuses/${campus.id}`} key={campus.id}>
        <Image centered size="medium" src={campus.imageUrl} />
      </NavLink>
      <Card.Content>
        <NavLink to={`/campuses/${campus.id}`} key={campus.id}>
          <Card.Header>{campus.name}</Card.Header>
        </NavLink>
        {campus.address}
      </Card.Content>
      <Card.Content extra>
        <Button
          icon
          onClick={() => {
            props.deleteCampus(campus.id);
          }}
        >
          <Icon name="delete" />
        </Button>
      </Card.Content>
    </Card>
  );
};

export default CampusCard;
