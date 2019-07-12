import React from 'react';
import { Container, Header, Form, Button, Message } from 'semantic-ui-react';
import { withRouter, NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateStudentThunk } from '../redux/singleStudent';
import StudentForm from './StudentForm';

class DisconnectedEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        {
          label: 'First Name',
          name: 'firstName',
          value: this.props.selectedStudent.firstName,
        },
        {
          label: 'Last Name',
          name: 'lastName',
          value: this.props.selectedStudent.lastName,
        },
        {
          label: 'Email',
          name: 'email',
          value: this.props.selectedStudent.email,
        },
        {
          label: 'Image URL',
          name: 'imageUrl',
          value: this.props.selectedStudent.imageUrl,
        },
        {
          label: 'GPA',
          name: 'gpa',
          value: this.props.selectedStudent.gpa,
        },
      ],
      errorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    try {
      event.preventDefault();
      const item = {};
      this.state.fields.map(field => {
        item[field.name] = field.value;
      });
      item.id = this.props.selectedStudent.id;
      this.props.update(item);
    } catch (error) {
      console.log('error', error.message);
      this.setState({ errorMessage: error.message });
    }
  }

  render() {
    return (
      <Container style={{ marginTop: '5rem' }}>
        <Header as="h2">Student</Header>
        <Form onSubmit={this.handleSubmit} style={{ marginTop: '2rem' }}>
          {this.state.fields.map(field => {
            return (
              <Form.Input
                key={field.name}
                label={field.label}
                required
                name={field.name}
                value={field.value}
                onChange={this.handleChange}
              />
            );
          })}
          <Button primary type="submit">
            Save
          </Button>
          <Button
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Back
          </Button>
          <Message
            error
            header="Error"
            content="Looks like there's a problem with your submission. Please try again."
          />
        </Form>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    selectedStudent: state.selectedStudent,
  };
};

const mapDispatch = dispatch => {
  return {
    update: student => dispatch(updateStudentThunk(student)),
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DisconnectedEditPage)
);
