import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

import { AuthContext } from '../../../utils/AuthProvider';
// text-white sticky-top
function NavBar() {

  const {loggedinUser,user} = useContext(AuthContext);
  
  return (
    
    <Navbar expand="lg" className="bg-green-500 z-10 ">
      <div className="px-[10px] text-white font-bold">  {user.name.toUpperCase()}</div>
      <Container>
        {/* <Navbar.Brand href="#home"><span className="text-white">gOoTaR</span></Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"><span className="text-white">Home</span></Nav.Link>
            <Nav.Link as={Link} to="/login"><span className="text-white">Login</span></Nav.Link>
            <Nav.Link as={Link} to="/create-group"><span className="text-white">create+</span></Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1"><span className="text-white">Action</span></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"><span className="text-white">Another action</span></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"><span className="text-white">Something</span></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4"><span className="text-white">Separated link</span></NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default NavBar;
