import React from 'react';

export const CampusForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="name">
        Campus Name:
        {/* {!campus.name.length ? (
            <span className="warning">Field Required</span>
          ) : (
            <span />
          )} */}
      </label>
      <input
        name="name"
        type="text"
        value={props.state.name}
        onChange={props.handleChange}
      />
      <br />
      <label htmlFor="address">Address:</label>
      <input
        name="address"
        type="text"
        value={props.state.address}
        onChange={props.handleChange}
      />
      <br />
      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        rows="3"
        value={props.state.description}
        onChange={props.handleChange}
      />
      <br />
      {/* <label htmlFor="imageUrl">Image:</label>
      <input
        name="imageUrl"
        type="file"
        accept="image/*"
        value={props.state.imageUrl}
        onChange={props.handleChange}
      />
      <br /> */}
      <button type="submit">Save</button>
      <button
        type="button"
        onClick={() => {
          console.log('history props', props);
          props.history.goBack();
        }}
      >
        Back
      </button>
      {props.state.errorMessage ? (
        <div className="error">Yikes! Looks like you got an error!</div>
      ) : (
        ''
      )}
    </form>
  );
};
