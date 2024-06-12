import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink, Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to = '/' className='navbar-brand'>HoangHeoThy</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to = '/' className='nav-link'>Home</NavLink>
                        <NavLink to = '/user' className='nav-link'>User</NavLink>
                        <NavLink to = '/admin' className='nav-link'>Admin</NavLink>
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#user">User</Nav.Link>
                        <Nav.Link href="#admin" >Admin</Nav.Link> */}
                    </Nav>
                    <Nav>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item>Log in</NavDropdown.Item>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item>log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;