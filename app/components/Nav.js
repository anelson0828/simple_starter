import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

const Nav = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <NavLink to="/">Home</NavLink>
        </Menu.Item>
        <Menu.Item header>
          <NavLink to="/students/">Students</NavLink>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Nav;
