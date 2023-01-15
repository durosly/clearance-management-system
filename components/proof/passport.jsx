import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Passport() {
	return (
		<Row>
			<Col>
				<Form>
					<Form.Group
						className="mb-3"
						controlId="file"
					>
						<Form.Label>Upload passport</Form.Label>
						<Form.Control
							type="file"
							accept=".pdf, image/png, image/jpeg"
						/>
					</Form.Group>
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

export default Passport;
