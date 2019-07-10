import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

const Nav = () => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            <NavLink to="/">Home</NavLink>
          </Menu.Item>
          <Menu.Item as="a" header>
            <NavLink to="/campuses/">Campuses</NavLink>
          </Menu.Item>
          <Menu.Item as="a" header>
            <NavLink to="/students/">Students</NavLink>
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default Nav;
