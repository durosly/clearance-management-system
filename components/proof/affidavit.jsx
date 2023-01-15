import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AffidavitOfGoodConduct() {
	return (
		<>
			<Row>
				<Col>
					If you haven't gotten affidavit of good conduct form yet,
					please{" "}
					<a
						href="/file/security-form.pdf"
						download
					>
						download now
					</a>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form>
						<Form.Group
							className="mb-3"
							controlId="file"
						>
							<Form.Label>Upload affidavit Form</Form.Label>
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
		</>
	);
}

export default AffidavitOfGoodConduct;
