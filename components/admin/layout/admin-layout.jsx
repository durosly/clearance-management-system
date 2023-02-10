import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import { FaSchool } from "react-icons/fa";
import { TbSchool } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import ScrewdriverWrench from "../../icons/screw-driver-wrench";
import ChartLine from "../../icons/chart-line";
import BuildingColumns from "../../icons/building-columns";

function AdminLayout({ children }) {
	const router = useRouter();

	console.log(router.pathname);
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
							<Link
								href="/admin/dashboard"
								className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
							>
								<ScrewdriverWrench
									width={40}
									height={32}
								/>
								<span className="fs-4">Admin Area</span>
							</Link>
							<hr />
							<ul className="nav nav-pills flex-column mb-auto">
								{/* <li className="nav-item">
									<a
										href="#"
										
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
								</li> */}
								<li>
									<Link
										href="/admin/dashboard"
										className={`nav-link ${
											router.pathname ===
											"/admin/dashboard"
												? "active"
												: "link-dark"
										} `}
										aria-current="page"
									>
										<ChartLine
											width={16}
											height={16}
											fill="currentColor"
											className="me-2"
										/>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										href="/admin/college"
										className={`nav-link ${
											router.pathname === "/admin/college"
												? "active"
												: "link-dark"
										} `}
									>
										<BuildingColumns
											width={16}
											height={16}
											fill="currentColor"
											className="me-2"
										/>
										College
									</Link>
								</li>
								<li>
									<Link
										href="/admin/department"
										className={`nav-link ${
											router.pathname ===
											"/admin/department"
												? "active"
												: "link-dark"
										} `}
									>
										<FaSchool
											width={16}
											height={16}
											fill="currentColor"
											className="me-2"
										/>
										Department
									</Link>
								</li>
								<li>
									<Link
										href="/admin/session"
										className={`nav-link ${
											router.pathname === "/admin/session"
												? "active"
												: "link-dark"
										} `}
									>
										<TbSchool
											width={16}
											height={16}
											fill="currentColor"
											className="me-2"
										/>
										Session
									</Link>
								</li>
								<li>
									<Link
										href="/admin/payments"
										className={`nav-link ${
											router.pathname ===
											"/admin/payments"
												? "active"
												: "link-dark"
										} `}
									>
										<RiSecurePaymentLine
											width={16}
											height={16}
											fill="currentColor"
											className="me-2"
										/>
										Payments
									</Link>
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

				<div className="flex-grow-1">
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
						<Col md={12}>
							<Container>{children}</Container>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
}

export default AdminLayout;
