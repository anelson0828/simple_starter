import React from 'react'

class Root extends React.Component {
  componentDidMount() {
    // Huh, I wonder what this mysterious componentDidMount is doing here... 🤔
  }
  render() {
    return (
      <div>
        <nav>
          Welcome!
        </nav>
        <main>
          <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
          <p>This seems like a nice place to get started with some Routes!</p>
        </main>
      </div>
    )
  }
}

export default Root
