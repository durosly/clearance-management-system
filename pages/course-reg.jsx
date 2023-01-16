import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import UserWrapper from "../components/layout/user-wrapper";
import { Button } from "react-bootstrap";

function CourseRegistration() {
	return (
		<UserWrapper>
			<Container>
				<Row>
					<Col>
						<h2>Course Registration</h2>
					</Col>
				</Row>
				<Row>
					<Col>
						<h4>First semester</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table
							striped
							responsive
						>
							<thead>
								<tr>
									<th>Title</th>
									<th>Code</th>
									<th>Unit</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>computer Hardware II</td>
									<td>CSC212</td>
									<td>3</td>
									<td>
										<Form.Check type="checkbox" />
									</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button variant="primary">Register</Button>
					</Col>
				</Row>
			</Container>
		</UserWrapper>
	);
}

export default CourseRegistration;
