import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

function AdminLayout({ children }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<div className="d-flex column-gap-3">
				<Offcanvas
					show={show}
					onHide={handleClose}
					responsive="lg"
				>
					<Offcanvas.Header closeButton></Offcanvas.Header>
					<Offcanvas.Body>
						<div
							className="d-flex flex-column flex-shrink-0 p-3 bg-light min-vh-100"
							style={{ width: "280px" }}
						>
							<a
								href="/"
								className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
							>
								<svg
									className="bi pe-none me-2"
									width={40}
									height={32}
								>
									<use xlinkHref="#bootstrap" />
								</svg>
								<span className="fs-4">Sidebar</span>
							</a>
							<hr />
							<ul className="nav nav-pills flex-column mb-auto">
								<li className="nav-item">
									<a
										href="#"
										className="nav-link active"
										aria-current="page"
									>
										<svg
											className="bi pe-none me-2"
											width={16}
											height={16}
										>
											<use xlinkHref="#home" />
										</svg>
										Home
									</a>
								</li>
								<li>
									<a
										href="#"
										className="nav-link link-dark"
									>
										<svg
											className="bi pe-none me-2"
											width={16}
											height={16}
										>
											<use xlinkHref="#speedometer2" />
										</svg>
										Dashboard
									</a>
								</li>
								<li>
									<a
										href="#"
										className="nav-link link-dark"
									>
										<svg
											className="bi pe-none me-2"
											width={16}
											height={16}
										>
											<use xlinkHref="#table" />
										</svg>
										Orders
									</a>
								</li>
								<li>
									<a
										href="#"
										className="nav-link link-dark"
									>
										<svg
											className="bi pe-none me-2"
											width={16}
											height={16}
										>
											<use xlinkHref="#grid" />
										</svg>
										Products
									</a>
								</li>
								<li>
									<a
										href="#"
										className="nav-link link-dark"
									>
										<svg
											className="bi pe-none me-2"
											width={16}
											height={16}
										>
											<use xlinkHref="#people-circle" />
										</svg>
										Customers
									</a>
								</li>
							</ul>
							<hr />
							<div className="dropdown">
								<a
									href="#"
									className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<img
										src="https://github.com/mdo.png"
										alt=""
										width={32}
										height={32}
										className="rounded-circle me-2"
									/>
									<strong>mdo</strong>
								</a>
								<ul className="dropdown-menu text-small shadow">
									<li>
										<a
											className="dropdown-item"
											href="#"
										>
											New project...
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="#"
										>
											Settings
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="#"
										>
											Profile
										</a>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<a
											className="dropdown-item"
											href="#"
										>
											Sign out
										</a>
									</li>
								</ul>
							</div>
						</div>
					</Offcanvas.Body>
				</Offcanvas>

				<div>
					<Row>
						<Col xs="auto">
							<Button
								className="d-lg-none"
								variant="primary"
								onClick={handleShow}
							>
								Launch
							</Button>
						</Col>
						<Col md={12}>{children}</Col>
					</Row>
				</div>
			</div>
		</>
	);
}

export default AdminLayout;
