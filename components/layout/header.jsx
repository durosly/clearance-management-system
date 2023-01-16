import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Link from "next/link";

function Header() {
	const expand = "md";
	return (
		<Navbar
			bg="light"
			expand={expand}
			className="mb-3"
		>
			<Container fluid>
				<Navbar.Brand href="#">Student Portal</Navbar.Brand>
				<Navbar.Toggle
					aria-controls={`offcanvasNavbar-expand-${expand}`}
				/>
				<Navbar.Offcanvas
					id={`offcanvasNavbar-expand-${expand}`}
					aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
					placement="end"
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title
							id={`offcanvasNavbarLabel-expand-${expand}`}
						>
							Student Portal
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Link
								href="/profile"
								passHref
							>
								<Nav.Link>Home</Nav.Link>
							</Link>
							{/* <Nav.Link href="#action2">Link</Nav.Link> */}
							{/* <NavDropdown
								title="Dropdown"
								id={`offcanvasNavbarDropdown-expand-${expand}`}
							>
								<NavDropdown.Item href="#action3">
									Action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action4">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action5">
									Something else here
								</NavDropdown.Item>
							</NavDropdown> */}
						</Nav>
						{/* <Form className="d-flex">
							<Form.Control
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
							/>
						</Form> */}
						<Button variant="outline-success">Log out</Button>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
}

export default Header;
