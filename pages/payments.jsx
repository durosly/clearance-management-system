import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import UserWrapper from "../components/layout/user-wrapper";

function Payments() {
	return (
		<UserWrapper>
			<Container className="mb-5">
				<Row>
					<Col>
						<h2>Payments</h2>
					</Col>
				</Row>
				<Row>
					<Col>
						<ListGroup>
							<ListGroup.Item className="d-flex justify-content-between align-items-center">
								<div className="ms-2">
									<div className="fw-bold">Subheading</div>
								</div>
								<Button variant="primary">Pay now</Button>
								<Badge
									bg="primary"
									pill
								>
									14
								</Badge>
							</ListGroup.Item>
							<ListGroup.Item className="d-flex justify-content-between align-items-start">
								<div className="ms-2 me-auto">
									<div className="fw-bold">Subheading</div>
								</div>
								<Badge
									bg="primary"
									pill
								>
									14
								</Badge>
							</ListGroup.Item>
							<ListGroup.Item className="d-flex justify-content-between align-items-start">
								<div className="ms-2 me-auto">
									<div className="fw-bold">Subheading</div>
								</div>
								<Badge
									bg="primary"
									pill
								>
									14
								</Badge>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			</Container>
		</UserWrapper>
	);
}

export default Payments;
