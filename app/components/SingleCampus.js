import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const DisconnectedSingleCampus = props => {
  return (
    <div>
      <div id="singleCampus">
        <div />
        <h1>Single Campus</h1>
        <div>
          <img src={props.selectedCampus.imageUrl} />
          <br />
          {props.selectedCampus.address}
        </div>
        <div>
          <h1>{props.selectedCampus.name}</h1>
          <p>{props.selectedCampus.description}</p>
        </div>
      </div>
      <div>
        <h1>Students on campus</h1>
        <div>
          {props.selectedCampus.students.map(student => {
            return (
              <div key={student.id}>
                <image src={student.imageUrl} />
                {student.firstName} {student.lastName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    selectedCampus: state.selectedCampus,
  };
};

export default withRouter(connect(mapState)(DisconnectedSingleCampus));
