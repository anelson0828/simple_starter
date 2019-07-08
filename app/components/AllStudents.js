import React from 'react';

export const AllStudents = () => {
  return <div />
}

// Currently, we're just exporting the component as-is. When we're ready to
// hook it up to the redux store, we'll export the connected component by default:
// export default connect(mapState, mapDispatch)(AllStudents)
export default AllStudents
