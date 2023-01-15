import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function PersonalDetails() {
	return (
		<Row>
			<Col>
				<Form>
					<Form.Group
						className="mb-3"
						controlId="fullname"
					>
						<Form.Label>Full name</Form.Label>
						<Form.Control
							type="text"
							value={"John Doe"}
							disabled
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="formBasicEmail"
					>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={"Nice@gamil.com"}
							disabled
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="jamb"
					>
						<Form.Label>Jamb Reg. Number</Form.Label>
						<Form.Control
							type="text"
							placeholder="e.g 123456BC"
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="dob"
					>
						<Form.Label>Date of birth</Form.Label>
						<Form.Control
							type="date"
							min="1990-01-01"
							max="2013-12-31"
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="state-origin"
					>
						<Form.Label>State of origin</Form.Label>
						<Form.Control
							type="text"
							placeholder="Delta..."
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="local-origin"
					>
						<Form.Label>Local government of origin</Form.Label>
						<Form.Control
							type="text"
							placeholder="Uvwie..."
						/>
					</Form.Group>
					<hr />
					<Form.Group
						className="mb-3"
						controlId="state-residence"
					>
						<Form.Label>State of Residence</Form.Label>
						<Form.Control
							type="text"
							placeholder="Abuja..."
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="local-residence"
					>
						<Form.Label>Local government of residence</Form.Label>
						<Form.Control
							type="text"
							placeholder="Akure..."
						/>
					</Form.Group>
					<Form.Group
						className="mb-3"
						controlId="address"
					>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type="text"
							placeholder="11 nice street..."
						/>
					</Form.Group>
					<p>Check record before submitting</p>
					<Button
						variant="primary"
						type="submit"
					>
						Next
					</Button>
				</Form>
			</Col>
		</Row>
	);
}

export default PersonalDetails;
