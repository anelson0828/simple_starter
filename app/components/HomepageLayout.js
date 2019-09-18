import React from 'react';
import {
  Button,
  Container,
  Header,
  Image,
  Statistic,
  Card,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

const DisconnectedHomepage = props => (
  <Container textAlign="center" style={{ marginTop: '10rem' }}>
    <Header as="h1">Welcome!</Header>
    <Card.Group stackable itemsPerRow="2" style={{ marginTop: '5rem' }}>
      <Card raised style={{ margin: '1rem' }}>
        <Card.Content>
          <Statistic>
            <Statistic.Value>{props.students.length}</Statistic.Value>
            <Statistic.Label>Students</Statistic.Label>
          </Statistic>
        </Card.Content>
        <Card.Content extra>
          <Button
            onClick={() => {
              props.history.push('/students');
            }}
          >
            View Students
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  </Container>
);

const mapState = state => {
  return {
    students: state.students,
  };
};

export default connect(mapState)(DisconnectedHomepage);
