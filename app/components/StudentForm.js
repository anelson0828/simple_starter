import React from 'react';

export const StudentForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="firstName">
        First Name:
        {/* {!campus.name.length ? (
            <span className="warning">Field Required</span>
          ) : (
            <span />
          )} */}
      </label>
      <input
        name="firstName"
        type="text"
        value={props.state.firstName}
        onChange={props.handleChange}
      />
      <br />
      <label htmlFor="lastName">Last Name:</label>
      <input
        name="lastName"
        type="text"
        value={props.state.lastName}
        onChange={props.handleChange}
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        name="email"
        type="text"
        value={props.state.email}
        onChange={props.handleChange}
      />
      <br />
      <label htmlFor="gpa">GPA:</label>
      <input
        name="gpa"
        type="float"
        value={props.state.gpa}
        onChange={props.handleChange}
      />
      <br />
      <label htmlFor="imageUrl">Image:</label>
      <input
        name="imageUrl"
        type="file"
        accept="image/*"
        value={props.state.imageUrl}
        onChange={props.handleChange}
      />
      <br />
      <button type="submit">Submit</button>
      {props.state.errorMessage ? (
        <div className="error">Yikes! Looks like you got an error!</div>
      ) : (
        ''
      )}
    </form>
  );
};
