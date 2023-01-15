import UserWrapper from "../../components/layout/user-wrapper";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

function Profile() {
	return (
		<UserWrapper>
			<Container className="mb-5">
				<Row>
					<Col>
						<Image
							src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
							roundedCircle
							width={100}
							height={100}
						/>
					</Col>
					<Col sm={9}>
						<p>
							<b className="me-2">Full name:</b>
							John Doe
						</p>
						<p>
							<b className="me-2">Level:</b>
							100
						</p>
						<p>
							<b className="me-2">Department:</b>
							Mechanical Engineer
						</p>
						<p>
							<b className="me-2">Status:</b>
							<Badge bg="secondary">Pending...</Badge>
						</p>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<h2>Registraion status</h2>
					</Col>
				</Row>
				<Row className="row-gap-3">
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="warning">
							<Card.Body>
								<Card.Title>Profile completion</Card.Title>

								<Link
									href="/profile/complete"
									passHref
								>
									<Card.Link>Complete process</Card.Link>
								</Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Payments</Card.Title>
								<ProgressBar
									animated
									now={45}
								/>

								<Card.Link href="#">Complete payment</Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Course registration</Card.Title>

								<Card.Link href="#">Complete process</Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Security Form</Card.Title>

								<Card.Link href="#">Fill out info</Card.Link>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<h2>Clearance status</h2>
					</Col>
				</Row>
				<Row className="row-gap-3">
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Registra</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Card.Link href="#">Learn more...</Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Library</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Card.Link href="#">Learn more...</Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>College</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Card.Link href="#">Learn more...</Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Department</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Card.Link href="#">Learn more...</Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Dean of student affairs</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Card.Link href="#">Learn more...</Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col
						xs={12}
						sm={4}
						md={3}
					>
						<Card border="danger">
							<Card.Body>
								<Card.Title>Medical</Card.Title>
								<Card.Text>In progress</Card.Text>
								<Card.Link href="#">Learn more...</Card.Link>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</UserWrapper>
	);
}

export default Profile;
