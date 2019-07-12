import React from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment,
  Statistic,
  Card,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

const DisconnectedHomepage = props => (
  <Container textAlign="center" style={{ marginTop: '10rem' }}>
    <Header as="h1">Welcome!</Header>
    <Card.Group stackable itemsPerRow="2" style={{ marginTop: '5rem' }}>
      <Card raised style={{ margin: '1rem' }}>
        <Image
          src="https://cdn.gobankingrates.com/wp-content/uploads/2017/07/0_main_170517_gbr_studentloaninterestrates_1920x1080.jpg"
          wrapped
        />
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
      <Card raised style={{ margin: '1rem' }}>
        <Image
          src="https://d13b2ieg84qqce.cloudfront.net/ad72f5277e4ca7e90712c9b8145a1145168a0ce2.jpg"
          wrapped
          ui={false}
          size="medium"
        />
        <Card.Content>
          <Statistic>
            <Statistic.Value>{props.campuses.length}</Statistic.Value>
            <Statistic.Label>Campuses</Statistic.Label>
          </Statistic>
        </Card.Content>
        <Card.Content extra>
          <Button
            onClick={() => {
              props.history.push('/campuses');
            }}
          >
            View Campuses
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  </Container>
);

const mapState = state => {
  return {
    students: state.students,
    campuses: state.campuses,
  };
};

export default connect(mapState)(DisconnectedHomepage);
